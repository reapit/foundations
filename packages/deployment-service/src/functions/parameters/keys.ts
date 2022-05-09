import { ParameterDto } from '../../dto'
import { httpHandler, NotFoundException } from '@homeservenow/serverless-aws-handler'
import { defaultOutputHeaders } from '../../constants'
import { ownership, resolveCreds } from '../../utils'
import { createParameterStoreClient, findPipelineById } from '../../services'

export const parameterKeys = httpHandler<ParameterDto, Array<string>>({
  defaultOutputHeaders,
  handler: async ({ event }): Promise<Array<string>> => {
    const pipelineId = event.pathParameters?.pipelineId
    const { developerId } = await resolveCreds(event)

    if (!pipelineId) {
      throw new NotFoundException()
    }

    const pipeline = await findPipelineById(pipelineId)

    if (!pipeline) {
      throw new NotFoundException()
    }

    ownership(pipeline?.developerId as string, developerId)

    const parameterStoreClient = await createParameterStoreClient()
    const parameters = await new Promise<Record<string, any>>((resolve, reject) =>
      parameterStoreClient.getParameter(
        {
          Name: `cloud-${pipeline.id}`,
          WithDecryption: true,
        },
        (err, data) => {
          if (err && err.code !== 'ParameterNotFound') reject(err)
          resolve(data && data.Parameter && data.Parameter.Value ? JSON.parse(data.Parameter.Value) : {})
        },
      ),
    )

    return Object.keys(parameters)
  },
})
