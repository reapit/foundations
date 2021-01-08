import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'
import { EventStatus, generateStatusItem } from '../../schemas/event-status.schema'
import { db } from '../../core/db'

export default async (req: AppRequest, res: Response) => {
  const eventId = req.params.eventId as string | undefined
  const newStatus = req.body.status as EventStatus['status']
  const { traceId } = req

  try {
    logger.info('Updating status by statusId...', { traceId, eventId })

    const itemToGet = generateStatusItem({ eventId })
    const retrievedItem = await db.get(itemToGet)

    if (retrievedItem.clientCode !== req.user.clientCode) {
      res.status(401)
      return res.json({
        error: 'Unauthorized',
        code: 401,
      })
    }

    const now = new Date().toISOString()
    const itemToUpdate = generateStatusItem({ eventId, status: newStatus, statusUpdatedAt: now })

    const result = await db.update(itemToUpdate, { onMissing: 'skip' })

    res.status(200)
    return res.json(result)
  } catch (error) {
    logger.error('Error updating status', stringifyError(error))

    if (error.name === 'ItemNotFoundException') {
      res.status(200)
      return res.json({
        error: `Status not found for ${eventId}`,
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
