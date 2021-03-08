import { Response } from 'express'
import uuidv4 from 'uuid/v4'
import { stringifyError } from '@reapit/node-utils'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { db } from '../../core/db'
import { AutomationRequiredFields, generateAutomationItem } from '../../schemas/automation.schema'

type Payload = AutomationRequiredFields

export default async (req: AppRequest, res: Response) => {
  const payload = req.body as Payload
  const { traceId } = req

  try {
    logger.info('Create new automation...', { traceId, payload })

    if (req.user?.clientCode !== payload.clientCode) {
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
