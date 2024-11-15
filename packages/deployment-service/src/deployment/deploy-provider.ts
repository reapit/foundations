import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { PipelineEntity } from '../entities/pipeline.entity'
import { InvalidPipelineResourcesException } from '../exceptions'
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'
import { Injectable } from '@nestjs/common'
import { S3Provider } from '../s3'
import AdmZip from 'adm-zip'
import rimraf from 'rimraf'
import mime from 'mime-types'

export type DeployToS3Params = {
  filePath: string
  prefix: string
  buildLocation: string
  fileNameTransformer?: (string) => string
}

export type recurseDirProps = {
  filePath: string
  buildLocation: string
  prefix: string
  fileNameTransformer?: (path: string) => string
}

@Injectable()
export class DeployProvider {
  constructor(
    private readonly s3Provider: S3Provider,
    private readonly cloudfrontClient: CloudFrontClient,
  ) {}

  protected getFromVersionS3(location: string) {
    return this.s3Provider.getObject({
      Bucket: process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string,
      Key: `pipeline/${location}`,
    })
  }

  protected deleteCurrentLiveVersion(location: string) {
    return this.s3Provider.deleteObject({
      Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
      Key: location,
    })
  }

  /**
   * Deploys to live bucket from an archived bucket
   *
   * Codebuild will 'archive' to an 'archive' bucket and store zip against pipeline-runner Id
   * This function will find that archived build zip, publish to the live bucket and invalidate cloudfront
   *
   */
  async deployFromStore({
    pipeline,
    pipelineRunner,
  }: {
    pipeline: PipelineEntity
    pipelineRunner: PipelineRunnerEntity
  }): Promise<void> {
    const storageLocation = `${pipeline.uniqueRepoName}/${pipelineRunner.id}.zip`

    if (!pipelineRunner.pipeline?.cloudFrontId) {
      throw new InvalidPipelineResourcesException(pipeline.id as string)
    }

    const zip = await this.getFromVersionS3(storageLocation)

    if (!zip.Body) {
      throw new Error('Failed to find stored version')
    }

    await this.deleteCurrentLiveVersion(`pipeline/${pipeline.uniqueRepoName}`)

    await this.releaseToLiveFromZip({
      file: zip.Body as Buffer,
      localLocation: `/tmp/deployment/${pipeline.uniqueRepoName}/deployment.zip`,
      deploymentType: 'pipeline',
      projectLocation: pipeline.uniqueRepoName,
    })

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

    await this.cloudfrontClient.send(invalidateCommand)
  }

  async releaseToLiveFromZip({
    file,
    localLocation,
    deploymentType,
    projectLocation,
  }: {
    file: Buffer
    deploymentType: 'release' | 'pipeline'
    localLocation: string
    projectLocation: string
  }) {
    const zip = new AdmZip(file)

    // await the files to all exist. Some reason when extracting, some files don't exist for readdir
    if (process.env.NODE_ENV !== 'local') await new Promise((resolve) => setTimeout(resolve, 6000))

    await Promise.all(
      zip.getEntries().map((entry) =>
        this.deployBufferToLiveS3({
          fileName: entry.entryName,
          buffer: entry.getData(),
          prefix: `${deploymentType}/${projectLocation}`,
        }),
      ),
    )

    await new Promise<void>((resolve) =>
      rimraf(localLocation, () => {
        resolve()
      }),
    )
  }

  async deployBufferToLiveS3({ buffer, fileName, prefix }: { buffer: Buffer; fileName: string; prefix: string }) {
    const extension = fileName.split('.').pop()

    if (!extension) throw new Error('extension not found')

    const mimeType = String(mime.lookup(extension))

    return this.s3Provider.upload({
      Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
      Key: `${prefix}/${fileName}`,
      Body: buffer,
      // ACL: 'public-read',
      ContentType: mimeType,
      Metadata: {
        ['Content-Type']: mimeType,
      },
    })
  }
}
