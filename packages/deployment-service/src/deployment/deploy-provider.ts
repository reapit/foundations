import { PipelineRunnerEntity } from '../entities/pipeline-runner.entity'
import { PipelineEntity } from '../entities/pipeline.entity'
import { InvalidPipelineResourcesException } from '../exceptions'
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront'
import { Injectable } from '@nestjs/common'
import { S3Provider } from '../s3'
import fs from 'fs'
import AdmZip from 'adm-zip'
import rimraf from 'rimraf'
import mime from 'mime-types'
import path from 'path'

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
    if (!fs.existsSync(localLocation)) {
      fs.mkdirSync(localLocation, {
        recursive: true,
      })
    }

    const zip = new AdmZip(file)

    // Dumb arse package, upgraded minor with new property, without updating types about it...
    await new Promise<void>((resolve, reject) =>
      // @ts-ignore
      zip.extractAllToAsync(localLocation, true, true, (err) => {
        if (err) {
          console.error(err)
          reject(err)
        }
        resolve()
      }),
    )
    // await the files to all exist. Some reason when extracting, some files don't exist for readdir
    if (process.env.NODE_ENV !== 'local') await new Promise((resolve) => setTimeout(resolve, 6000))
    await this.recurseDir({
      dir: localLocation,
      prefix: `${deploymentType}/${projectLocation}`,
      buildLocation: localLocation,
    })

    await new Promise<void>((resolve) =>
      rimraf(localLocation, () => {
        resolve()
      }),
    )
  }

  async deployToLiveS3({ filePath, prefix, buildLocation, fileNameTransformer }: DeployToS3Params): Promise<void> {
    const key = fileNameTransformer
      ? fileNameTransformer(filePath.substring(buildLocation.length))
      : filePath.substring(buildLocation.length)

    return this.s3Provider.upload({
      Bucket: process.env.DEPLOYMENT_LIVE_BUCKET_NAME as string,
      Key: `${prefix}/${key
        .split('/')
        .filter((part) => part !== '')
        .join('/')}`,
      Body: fs.readFileSync(filePath),
      ACL: 'public-read',
      ContentType: String(mime.lookup(path.extname(filePath))),
      Metadata: {
        ['Content-Type']: String(mime.lookup(path.extname(filePath))),
      },
    })
  }

  async recurseDir({
    dir,
    prefix,
    buildLocation,
    fileNameTransformer,
  }: {
    dir: string
    prefix: string
    buildLocation: string
    fileNameTransformer?: (path: string) => string
  }): Promise<void> {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true })
    await Promise.all(
      entries.map((dirent) => {
        const filePath = path.join(dir, dirent.name)
        if (dirent.isFile()) {
          return this.deployToLiveS3({ filePath, buildLocation, prefix, fileNameTransformer })
        } else if (dirent.isDirectory()) {
          return this.recurseDir({
            dir: filePath,
            prefix,
            buildLocation,
            fileNameTransformer,
          })
        }
      }),
    )
  }
}
