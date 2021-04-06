import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { Automation, generateAutomationItem } from '../../schemas/automation.schema'
import { db } from '../../core/db'
import { HttpStatusCodeEnum } from '@/types/http.status.enum'

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

    if (retrievedItem.clientCode !== req.user?.clientCode) {
      res.status(HttpStatusCodeEnum.UNAUTHORIZED)
      return res.json({
        error: 'Unauthorized',
        code: HttpStatusCodeEnum.UNAUTHORIZED,
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

    res.status(HttpStatusCodeEnum.OK)
    return res.json(result)
  } catch (error) {
    logger.error('Error updating automation', stringifyError(error))

    if (error.name === 'ItemNotFoundException') {
      res.status(HttpStatusCodeEnum.OK)
      return res.json({
        error: `Automation with ID ${id} not found`,
        code: HttpStatusCodeEnum.NOT_FOUND,
      })
    }

    res.status(HttpStatusCodeEnum.BAD_REQUEST)
    res.json({
      error: `Bad request ${error}`,
      code: HttpStatusCodeEnum.BAD_REQUEST,
    })
  }
}
