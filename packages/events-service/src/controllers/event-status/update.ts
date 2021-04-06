import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { EventStatus, generateStatusItem } from '../../schemas/event-status.schema'
import { db } from '../../core/db'
import { HttpStatusCodeEnum } from '@/types/http.status.enum'

export default async (req: AppRequest, res: Response) => {
  const eventId = req.params.eventId as string | undefined
  const newStatus = req.body.status as EventStatus['status']
  const { traceId } = req

  try {
    logger.info('Updating status by statusId...', { traceId, eventId })

    const itemToGet = generateStatusItem({ eventId })
    const retrievedItem = await db.get(itemToGet)

    if (retrievedItem.clientCode !== req.user?.clientCode) {
      res.status(HttpStatusCodeEnum.UNAUTHORIZED)
      return res.json({
        error: 'Unauthorized',
        code: HttpStatusCodeEnum.UNAUTHORIZED,
      })
    }

    const now = new Date().toISOString()
    const itemToUpdate = generateStatusItem({ eventId, status: newStatus, statusUpdatedAt: now })

    const result = await db.update(itemToUpdate, { onMissing: 'skip' })

    res.status(HttpStatusCodeEnum.OK)
    return res.json(result)
  } catch (error) {
    logger.error('Error updating status', stringifyError(error))

    if (error.name === 'ItemNotFoundException') {
      res.status(HttpStatusCodeEnum.OK)
      return res.json({
        error: `Status not found for ${eventId}`,
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
