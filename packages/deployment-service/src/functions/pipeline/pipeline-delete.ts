import { httpHandler, NotFoundException, HttpStatusCode } from '@homeservenow/serverless-aws-handler'
import * as service from './../../services/pipeline'
import { ownership, resolveCreds } from './../../utils'
import { defaultOutputHeaders, QueueNames } from './../../constants'
import { sqs, pusher } from '../../services'

/**
 * Delete a pipeline
 */
export const pipelineDelete = httpHandler({
  defaultOutputHeaders,
  defaultStatusCode: HttpStatusCode.NO_CONTENT,
  handler: async ({ event }): Promise<void> => {
    const { developerId } = await resolveCreds(event)

    const pipeline = await service.findPipelineById(event.pathParameters?.pipelineId as string)

    if (!pipeline) {
      throw new NotFoundException()
    }

    await ownership(pipeline.developerId, developerId)

    await service.updatePipelineEntity(pipeline, {
      buildStatus: 'DELETING',
    })

    await pusher.trigger(`private-${pipeline?.developerId}`, 'pipeline-delete', pipeline)

    await new Promise<void>((resolve, reject) =>
      sqs.sendMessage(
        {
          QueueUrl: QueueNames.PIPELINE_TEAR_DOWN_START,
          MessageBody: JSON.stringify(pipeline),
        },
        (error) => {
          error ? reject(error) : resolve()
        },
      ),
    )
  },
})
