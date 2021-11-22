import { s3Client } from '../services'
import { PipelineEntity, PipelineRunnerEntity } from './../entities'
import { GetObjectOutput } from 'aws-sdk/clients/s3'
import { releaseToLiveFromZip } from './release-to-live'
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'

const getFromVersionS3 = async (location: string): Promise<GetObjectOutput | never> =>
  new Promise<GetObjectOutput>((resolve, reject) =>
    s3Client.getObject(
      {
        Bucket: process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string,
        Key: `pipeline/${location}`,
      },
      (error, data) => {
        if (error) {
          console.error(error)
          reject(error)
        }

        resolve(data)
      },
    ),
  )

const deleteCurrentLiveVersion = (prefix: string): Promise<void | never> =>
  new Promise<void>((resolve, reject) =>
    s3Client.deleteObject(
      {
        Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
        Key: prefix,
      },
      (error) => {
        if (error) {
          console.error(error)
          reject(error)
        }

        resolve()
      },
    ),
  )

export const deployFromStore = async ({
  pipeline,
  pipelineRunner,
}: {
  pipeline: PipelineEntity
  pipelineRunner: PipelineRunnerEntity
}): Promise<void> => {
  const storageLocation = `${pipeline.uniqueRepoName}/${pipelineRunner.id}.zip`

  console.log('fetching version from s3', `pipeline/${storageLocation}`)
  const zip = await getFromVersionS3(storageLocation)

  if (!zip.Body) {
    throw new Error('Failed to find stored version')
  }

  await deleteCurrentLiveVersion(`pipeline/${pipeline.uniqueRepoName}`)

  await releaseToLiveFromZip({
    file: zip.Body as Buffer,
    localLocation: `/tmp/deployment/${pipeline.uniqueRepoName}/deployment.zip`,
    deploymentType: 'pipeline',
    projectLocation: pipeline.uniqueRepoName,
  })

  const cloudFrontClient = new CloudFrontClient({})
  const invalidateCommand = new CreateInvalidationCommand({
    DistributionId: pipelineRunner.pipeline?.cloudFrontId,
    InvalidationBatch: {
      Paths: {
        Items: ['/*'],
        Quantity: 1,
      },
      CallerReference: `deployment refresh for pipeline runner [${pipelineRunner.id}]`,
    },
  })

  await cloudFrontClient.send(invalidateCommand)
}
