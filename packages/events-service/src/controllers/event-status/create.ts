import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { FunctionExpression, AttributePath } from '@aws/dynamodb-expressions'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { db } from '../../core/db'
import { generateStatusItem } from '../../schemas/event-status.schema'
import { HttpStatusCodeEnum } from '@/types/http.status.enum'

type Payload = {
  eventId: string
  clientCode: string
  status: 'outstanding' | 'actioned' | 'dismissed'
  eventCreatedAt: Date
}

export default async (req: AppRequest, res: Response) => {
  const payload = req.body as Payload
  const { traceId } = req

  try {
    logger.info('Create new status...', { traceId, payload })

    if (req.user?.clientCode !== payload.clientCode) {
      res.status(HttpStatusCodeEnum.UNAUTHORIZED)
      return res.json({
        error: 'Unauthorized',
        code: HttpStatusCodeEnum.UNAUTHORIZED,
      })
    }

    const now = new Date().toISOString()
    const eventCreatedAt = payload.eventCreatedAt.toISOString()
    const itemToCreate = generateStatusItem({ ...payload, eventCreatedAt, statusCreatedAt: now, statusUpdatedAt: now })

    const result = await db.put(itemToCreate, {
      condition: {
        type: 'And',
        conditions: [new FunctionExpression('attribute_not_exists', new AttributePath('eventId'))],
      },
    })

    logger.info('Created event status successfully', { traceId, result })

    res.status(HttpStatusCodeEnum.CREATED)
    return res.json(result)
  } catch (error) {
    logger.error('Error creating status', stringifyError(error))

    if (error.name === 'ConditionalCheckFailedException') {
      res.status(HttpStatusCodeEnum.CONFLICT)
      return res.json({
        error: `Conflict. Event with eventId ${payload.eventId} already exists`,
        code: HttpStatusCodeEnum.CONFLICT,
      })
    }

    res.status(HttpStatusCodeEnum.BAD_REQUEST)
    res.json({
      error: `Bad request ${error}`,
      code: HttpStatusCodeEnum.BAD_REQUEST,
    })
  }
}
