import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'
import { Automation, generateAutomationItem } from '../../schemas/automation.schema'
import { db } from '../../core/db'

type Payload = {
  messageChannel?: Automation['messageChannel']
  messageBody?: Automation['messageBody']
  triggerOnEventType?: Automation['triggerOnEventType']
}

export default async (req: AppRequest, res: Response) => {
  const id = req.params.id as string | undefined
  const payload = req.body as Payload
  const { traceId } = req

  try {
    logger.info('Updating automation by id...', { traceId, id })

    const itemToGet = generateAutomationItem({ id })
    const retrievedItem = await db.get(itemToGet)

    if (retrievedItem.clientCode !== (req as any).user.clientCode) {
      res.status(401)
      return res.json({
        error: 'Unauthorized',
        code: 401,
      })
    }

    const now = new Date().toISOString()
    const itemToUpdate = generateAutomationItem({
      ...retrievedItem,
      messageChannel: payload.messageChannel || retrievedItem.messageChannel,
      messageBody: payload.messageBody || retrievedItem.messageBody,
      triggerOnEventType: payload.triggerOnEventType || retrievedItem.triggerOnEventType,
      updatedAt: now,
    })

    const result = await db.update(itemToUpdate, { onMissing: 'skip' })

    res.status(200)
    return res.json(result)
  } catch (error) {
    logger.error('Error updating automation', stringifyError(error))

    if (error.name === 'ItemNotFoundException') {
      res.status(200)
      return res.json({
        error: `Automation with ID ${id} not found`,
        code: 404,
      })
    }

    res.status(400)
    res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
