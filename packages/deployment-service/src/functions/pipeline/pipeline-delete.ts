import {
  httpHandler,
  NotFoundException,
  HttpStatusCode,
  HttpErrorException,
} from '@homeservenow/serverless-aws-handler'
import * as service from './../../services/pipeline'
import { ownership, resolveCreds } from './../../utils'
import { defaultOutputHeaders, QueueNames } from './../../constants'
import { sqs, pusher } from '../../services'
import { PipelineEntity } from '../../entities/pipeline.entity'

/**
 * Delete a pipeline
 */
export const pipelineDelete = httpHandler({
  defaultOutputHeaders,
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ event }): Promise<PipelineEntity> => {
    const { developerId } = await resolveCreds(event)

    const pipeline = await service.findPipelineById(event.pathParameters?.pipelineId as string)

    if (!pipeline) {
      throw new NotFoundException()
    }

    ownership(pipeline.developerId, developerId)

    if (!pipeline.isPipelineDeletable) {
      throw new HttpErrorException('Cannot delete pipeline in current build status', 409 as HttpStatusCode)
    }

    const updatedPipeline = await service.updatePipelineEntity(pipeline, {
      buildStatus: 'DELETING',
    })

    await pusher.trigger(`private-${pipeline?.developerId}`, 'pipeline-delete', updatedPipeline)

    await new Promise<void>((resolve, reject) =>
      sqs.sendMessage(
        {
          QueueUrl: QueueNames.PIPELINE_TEAR_DOWN_START,
          MessageBody: JSON.stringify(updatedPipeline),
        },
        (error) => {
          error ? reject(error) : resolve()
        },
      ),
    )

    return updatedPipeline
  },
})
