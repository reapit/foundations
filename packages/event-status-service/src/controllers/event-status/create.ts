import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'
import { FunctionExpression, AttributePath } from '@aws/dynamodb-expressions'
import { db } from '../../core/db'
import { generateStatusItem } from '../../schemas/event-status.schema'

type payload = {
  eventId: string
  clientCode: string
  status: 'outstanding' | 'actioned' | 'dismissed'
  eventCreatedAt: Date
}

export const createEventStatus = async (req: AppRequest, res: Response) => {
  const payload = req.body as payload
  const { traceId } = req

  try {
    logger.info('Create new status...', { traceId, payload })

    if (req.user.clientCode !== payload.clientCode) {
      return res.status(401).json({
        error: 'Unauthorized',
        code: 401,
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

    res.status(201)
    res.json({
      result,
    })
  } catch (error) {
    logger.error('Error creating status', stringifyError(error))

    if (error.name === 'ConditionalCheckFailedException') {
      res.status(409)
      return res.json({
        error: `Conflict. Event with eventId ${payload.eventId} already exists`,
        code: 409,
      })
    }

    res.status(400)
    res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
