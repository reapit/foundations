import { resolveCreds } from '../../utils'
import { BadRequestException, httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { s3Client } from '../../services'
import { defaultOutputHeaders } from '../../constants'
import * as services from './../../services/pipeline-runner'
import { PipelineEntity, PipelineRunnerEntity } from './../../entities'
import { deployFromStore } from './../../executables/deploy-from-store'

/**
 * Release a particular version
 */
export const deployVersion = httpHandler<void, PipelineRunnerEntity>({
  defaultOutputHeaders,
  handler: async ({ event }) => {
    await resolveCreds(event)
    const { pipelineRunnerId } = event.pathParameters as { pipelineRunnerId: string }

    if (!pipelineRunnerId) {
      throw new BadRequestException()
    }

    const pipelineRunner = await services.findPipelineRunnerById(pipelineRunnerId)

    if (!pipelineRunner) {
      throw new NotFoundException(`version [${pipelineRunnerId}] did not previously exist`)
    }

    const file = await new Promise<AWS.S3.Body>((resolve, reject) =>
      s3Client.getObject(
        {
          Bucket: process.env.DEPLOYMENT_BUCKET_NAME as string,
          Key: pipelineRunner.S3Location as string,
        },
        (err, data) => {
          if (err) {
            console.error(err)
            reject()
          }
          resolve(data.Body as AWS.S3.Body)
        },
      ),
    )

    if (!file) {
      throw new NotFoundException()
    }

    await Promise.all([
      deployFromStore({
        pipeline: pipelineRunner.pipeline as PipelineEntity,
        pipelineRunner,
      }),
      services.resetCurrentlyDeployed(pipelineRunner.pipeline as PipelineEntity),
    ])

    pipelineRunner.currentlyDeployed = true

    return services.savePipelineRunnerEntity(pipelineRunner)
  },
})
