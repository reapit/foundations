import { getCdkJson, updateCdkJson } from './github'
import { getCredentials, uploadFiles } from './s3-upload'

const { GH_PAT, DEVOPS_OIDC_ROLE, DEVOPS_BUCKET_ROLE, DEVOPS_PRIMARY_REGION, DEVOPS_ARTIFACT_BUCKET } = process.env

if (!GH_PAT) {
  console.error('GH_PAT not defined')
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

if (!GH_PAT || !DEVOPS_OIDC_ROLE || !DEVOPS_BUCKET_ROLE || !DEVOPS_PRIMARY_REGION || !DEVOPS_ARTIFACT_BUCKET) {
  throw new Error('Required env not present')
}

type DevopsAsset = {
  devopsKey: string
  filePath: string
}

export const devopsRelease = async ({
  assets,
  devopsProjectName,
  stage,
}: {
  devopsProjectName: string
  stage: string
  assets: DevopsAsset[]
}) => {
  // for each asset validate obj.context[stage][devopsKey] exists

  const cdkJson = await getCdkJson(GH_PAT, devopsProjectName)

  if (!cdkJson.context) {
    throw new Error('cdkJson has no context')
  }

  if (!cdkJson.context[stage]) {
    throw new Error(`stage ${stage} not found in cdkJson context`)
  }

  assets.forEach((asset) => {
    if (!cdkJson.context[stage][asset.devopsKey]) {
      throw new Error(`component ${asset.devopsKey} not found in cdkJson stage ${stage} context`)
    }
  })

  const credentials = await getCredentials({
    bucketRole: DEVOPS_BUCKET_ROLE,
    oidcRoleArn: DEVOPS_OIDC_ROLE,
    region: DEVOPS_PRIMARY_REGION,
  })

  const uploadedFiles = await uploadFiles({
    bucket: DEVOPS_ARTIFACT_BUCKET,
    credentials,
    folder: devopsProjectName,
    filePaths: assets,
    region: DEVOPS_PRIMARY_REGION,
  })

  // update obj with uploadedFiles
  uploadedFiles.forEach((asset) => {
    cdkJson.context[stage][asset.devopsKey]['codeZipName'] = asset.objectKey
  })

  await updateCdkJson(GH_PAT, devopsProjectName, JSON.stringify(cdkJson, null, 2), stage)
}
