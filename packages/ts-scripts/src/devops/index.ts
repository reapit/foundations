import { getCdkJson, updateCdkJson } from './github'
import { getCredentials, uploadFiles } from './s3-upload'

const { API_TOKEN_GITHUB, DEVOPS_OIDC_ROLE, DEVOPS_BUCKET_ROLE, DEVOPS_PRIMARY_REGION, DEVOPS_ARTIFACT_BUCKET } =
  process.env

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

  const cdkJson = await getCdkJson(API_TOKEN_GITHUB, devopsProjectName)

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
  })

  // update obj with uploadedFiles
  uploadedFiles.forEach((asset) => {
    cdkJson.context[stage][asset.devopsKey]['codeZipName'] = asset.objectKey
  })

  await updateCdkJson(API_TOKEN_GITHUB, devopsProjectName, JSON.stringify(cdkJson, null, 2), stage)
}