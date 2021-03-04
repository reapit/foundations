import { Response } from 'express'
import uuidv4 from 'uuid/v4'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'
import { db } from '../../core/db'
import { Automation, generateAutomationItem } from '../../schemas/automation.schema'

type Payload = {
  clientCode: Automation['clientCode']
  messageChannel: Automation['messageChannel']
  messageBody: Automation['messageBody']
  triggerOnEventType: Automation['triggerOnEventType']
}

export default async (req: AppRequest, res: Response) => {
  const payload = req.body as Payload
  const { traceId } = req

  try {
    logger.info('Create new automation...', { traceId, payload })

    if ((req as any).user.clientCode !== payload.clientCode) {
      res.status(401)
      return res.json({
        error: 'Unauthorized',
        code: 401,
      })
    }

    const now = new Date().toISOString()
    const id = uuidv4()
    const itemToCreate = generateAutomationItem({
      ...payload,
      id,
      createdAt: now,
      updatedAt: now,
    })
    const result = await db.put(itemToCreate)

    logger.info('Created automation successfully', { traceId, result })

    res.status(201)
    return res.json(result)
  } catch (error) {
    logger.error('Error creating automation', stringifyError(error))

    res.status(400)
    res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
