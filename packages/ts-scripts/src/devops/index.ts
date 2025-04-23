import { getCdkJson, updateCdkJson } from './github'
import { DevopsConfig } from './project-config'
import { getCredentials, uploadFiles } from './s3-upload'

const {
  DEVOPS_DEPLOYER_PAT,
  DEVOPS_OIDC_ROLE,
  DEVOPS_BUCKET_ROLE,
  DEVOPS_PRIMARY_REGION,
  DEVOPS_ARTIFACT_BUCKET,
  GITHUB_REPOSITORY,
} = process.env

if (!DEVOPS_DEPLOYER_PAT) {
  console.error('DEVOPS_DEPLOYER_PAT not defined')
}
if (!DEVOPS_OIDC_ROLE) {
  console.error('DEVOPS_OIDC_ROLE not defined')
}
if (!DEVOPS_BUCKET_ROLE) {
  console.error('DEVOPS_BUCKET_ROLE not defined')
}
if (!DEVOPS_PRIMARY_REGION) {
  console.error('DEVOPS_PRIMARY_REGION not defined')
}
if (!DEVOPS_ARTIFACT_BUCKET) {
  console.error('DEVOPS_ARTIFACT_BUCKET not defined')
}

if (!GITHUB_REPOSITORY) {
  console.error('GITHUB_REPOSITORY not defined')
}

if (
  !DEVOPS_DEPLOYER_PAT ||
  !DEVOPS_OIDC_ROLE ||
  !DEVOPS_BUCKET_ROLE ||
  !DEVOPS_PRIMARY_REGION ||
  !DEVOPS_ARTIFACT_BUCKET ||
  !GITHUB_REPOSITORY
) {
  throw new Error('Required env not present')
}

export const devopsRelease = async ({ config, stage }: { config: DevopsConfig; stage: string }) => {
  const { assets, projectName } = config
  const cdkJson = await getCdkJson(DEVOPS_DEPLOYER_PAT, projectName)
  console.log('Found project in devops repo')

  if (!cdkJson.context) {
    throw new Error('cdkJson has no context')
  }

  if (!cdkJson.context[stage]) {
    throw new Error(`stage ${stage} not found in cdkJson context`)
  }

  assets.forEach((asset) => {
    if (!cdkJson.context[stage][asset.devopsKey] && !cdkJson.context[stage]['lambda'][asset.devopsKey]) {
      throw new Error(`component ${asset.devopsKey} not found in cdkJson stage ${stage} context`)
    }
    console.log(`Found ${asset.devopsKey} to deploy`)
  })

  const credentials = await getCredentials({
    bucketRole: DEVOPS_BUCKET_ROLE,
    oidcRoleArn: DEVOPS_OIDC_ROLE,
    region: DEVOPS_PRIMARY_REGION,
    repository: GITHUB_REPOSITORY,
  })

  console.log('Assumed devops role')

  const uploadedFiles = await uploadFiles({
    bucket: DEVOPS_ARTIFACT_BUCKET,
    credentials,
    folder: GITHUB_REPOSITORY,
    filePaths: assets,
    region: DEVOPS_PRIMARY_REGION,
  })

  console.log('Uploaded assets to S3 bucket')

  uploadedFiles.forEach((asset) => {
    if (cdkJson.context[stage][asset.devopsKey]) {
      cdkJson.context[stage][asset.devopsKey]['codeZipName'] = asset.objectKey
    } else if (cdkJson.context[stage]['lambda'][asset.devopsKey]) {
      cdkJson.context[stage]['lambda'][asset.devopsKey]['codeZipName'] = asset.objectKey
    }
  })

  await updateCdkJson(DEVOPS_DEPLOYER_PAT, projectName, JSON.stringify(cdkJson, null, 2), stage)

  console.log('Completed Successfully')
}
