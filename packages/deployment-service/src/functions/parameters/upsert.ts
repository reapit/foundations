import { ParameterDto } from '../../dto'
import { httpHandler, NotFoundException, ValidationException } from '@homeservenow/serverless-aws-handler'
import { defaultOutputHeaders } from '../../constants'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { ownership, resolveCreds } from '../../utils'
import { createParameterStoreClient, findPipelineById } from '../../services'

export const parameterUpsert = httpHandler<ParameterDto, void>({
  defaultOutputHeaders,
  validator: async (payload: any): Promise<ParameterDto> => {
    const dto = plainToClass(ParameterDto, payload)

    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ event, body }): Promise<void> => {
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
        },
        (err, data) => {
          if (err) reject(err)
          resolve(data && data.Parameter && data.Parameter.Value ? JSON.parse(data.Parameter.Value) : {})
        },
      ),
    )

    parameters[body.key] = body.value

    await new Promise<void>((resolve, reject) =>
      parameterStoreClient.putParameter(
        {
          Name: `cloud-${pipeline.id}`,
          Overwrite: true,
          Type: 'SecureString',
          Value: JSON.stringify(parameters),
        },
        (err) => {
          if (err) reject()
          resolve()
        },
      ),
    )
  },
})
