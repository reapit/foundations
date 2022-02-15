import { BadRequestException, httpHandler, ValidationException } from '@homeservenow/serverless-aws-handler'
import { PipelineDto } from './../../dto'
import { PipelineEntity } from '../../entities/pipeline.entity'
import * as service from './../../services/pipeline'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'
import { resolveCreds } from '../../utils'
import { defaultOutputHeaders, QueueNames } from '../../constants'
import { sqs, pusher } from '../../services'

/**
 * Create a deployment pipeline configuration
 */
export const pipelineCreate = httpHandler<PipelineDto, PipelineEntity>({
  defaultOutputHeaders,
  validator: async (payload: any): Promise<PipelineDto> => {
    const dto = plainToClass(PipelineDto, payload)

    const errors = await validate(dto)

    if (errors.length >= 1) {
      throw new ValidationException(errors as any)
    }

    return dto
  },
  handler: async ({ event }): Promise<PipelineEntity> => {
    const { developerId, clientId } = await resolveCreds(event)

    const dto = event.body
      ? plainToClass(PipelineDto, {
          ...JSON.parse(event.body),
          developerId,
          clientId,
        })
      : new PipelineDto()

    const previousPipeline = await service.findPipelineById(dto.appId as string)

    const pipeline = await service.createPipelineEntity({
      ...dto,
      ...previousPipeline,
      buildStatus: previousPipeline ? 'READY_FOR_DEPLOYMENT' : undefined,
      // Temp plug, singular appId/clientId for pipeline - later requires multiple pipelines
      id: dto.appId,
    })

    if (!pipeline) {
      throw new BadRequestException('Invalid pipeline properties')
    }

    if (!previousPipeline) {
      await new Promise<void>((resolve, reject) =>
        sqs.sendMessage(
          {
            MessageBody: JSON.stringify(pipeline),
            QueueUrl: QueueNames.PIPELINE_SETUP,
          },
          (error) => {
            if (error) {
              reject(error)
            }
            resolve()
          },
        ),
      )
    } else {
      await pusher.trigger(`private-${pipeline.developerId}`, 'pipeline-architecture-update', {
        ...pipeline,
        message: 'Pipeline successfully created',
      })
    }

    return pipeline
  },
})
