import { resolveCreds } from '../../utils'
import { BadRequestException, httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import {
  s3Client,
  createPipelineRunnerEntity,
  resetCurrentlyDeployed,
  savePipelineRunnerEntity,
  countPipelineRunnersWithBuildVersion,
} from '../../services'
import { defaultOutputHeaders } from '../../constants'
import * as pipelineService from '../../services/pipeline'
import { PipelineEntity, PipelineRunnerEntity } from '../../entities'
import { ownership } from '../../utils/ownership'
import { deployFromStore } from './../../executables'
import { PipelineRunnerType } from '@reapit/foundations-ts-definitions'

/**
 * Deploy a new release
 */
export const deployRelease = httpHandler<any, PipelineRunnerEntity>({
  defaultOutputHeaders,
  handler: async ({ event, body }) => {
    const { developerId } = await resolveCreds(event)

    const { pipelineId, version } = event.pathParameters as { pipelineId: string; version: string }

    const pipeline = await pipelineService.findPipelineById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    const existingVersions = await countPipelineRunnersWithBuildVersion(pipeline, version)

    if (existingVersions !== 0) {
      throw new BadRequestException(`build version [${version}] already exists`)
    }

    const file = Buffer.from(body.file, 'base64')

    if (!file) {
      throw new BadRequestException('File not provided')
    }

    const pipelineRunner = await createPipelineRunnerEntity({
      pipeline,
      type: PipelineRunnerType.RELEASE,
      buildVersion: version,
    })

    const s3FileName = `${pipeline.uniqueRepoName}/${pipelineRunner.id}.zip`

    pipelineRunner.S3Location = s3FileName

    await new Promise<void>((resolve, reject) =>
      s3Client.putObject(
        {
          Body: file,
          Bucket: process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string,
          Key: `pipeline/${s3FileName}`,
        },
        (error) => {
          if (error) {
            console.error(error)
            reject()
          }
          resolve()
        },
      ),
    )

    await Promise.all([
      deployFromStore({
        pipeline: pipelineRunner.pipeline as PipelineEntity,
        pipelineRunner,
      }),
      resetCurrentlyDeployed(pipelineRunner.pipeline as PipelineEntity),
    ])

    pipelineRunner.currentlyDeployed = true
    pipelineRunner.buildStatus = 'COMPLETED'

    return savePipelineRunnerEntity(pipelineRunner)
  },
})
