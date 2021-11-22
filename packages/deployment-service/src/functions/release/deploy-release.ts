import { resolveCreds } from '../../utils'
import { BadRequestException, httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { s3Client, createPipelineRunnerEntity, resetCurrentlyDeployed, savePipelineRunnerEntity } from '../../services'
import { defaultOutputHeaders } from '../../constants'
import * as pipelineService from '../../services/pipeline'
import { PipelineEntity, PipelineRunnerEntity, PipelineRunnerType } from '../../entities'
import { ownership } from '../../utils/ownership'
import { deployFromStore } from './../../executables'

/**
 * Deploy a new release
 */
export const deployRelease = httpHandler<any, PipelineRunnerEntity>({
  defaultOutputHeaders,
  handler: async ({ event, body }) => {
    const { developerId } = await resolveCreds(event)

    const { pipelineId } = event.pathParameters as { pipelineId: string }

    const pipeline = await pipelineService.findPipelineById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    const pipelineRunner = await createPipelineRunnerEntity({
      pipeline,
      type: PipelineRunnerType.RELEASE,
    })

    const s3FileName = `pipeline/${pipeline.uniqueRepoName}/${pipelineRunner.id}.zip`

    const file = Buffer.from(body.file, 'base64')

    if (!file) {
      throw new BadRequestException('File not provided')
    }

    await new Promise<void>((resolve, reject) =>
      s3Client.putObject(
        {
          Body: file,
          Bucket: process.env.DEPLOYMENT_VERSION_BUCKET_NAME as string,
          Key: `release/${s3FileName}`,
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

    return savePipelineRunnerEntity(pipelineRunner)
  },
})
