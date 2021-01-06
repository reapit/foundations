import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'
import { EventStatus } from '../../schemas/event-status.schema'
import { db } from '../../core/db'
import { generateStatusItem } from '../../schemas/event-status.schema'

export const updateStatusById = async (req: AppRequest, res: Response) => {
  const eventId = req.params.eventId as string | undefined
  const newStatus = req.body.status as EventStatus['status']
  const { traceId } = req

  try {
    logger.info('Updating status by statusId...', { traceId, eventId })

    const now = new Date().toISOString()
    const itemToUpdate = generateStatusItem({ eventId, status: newStatus, statusUpdatedAt: now })

    const result = await db.update(itemToUpdate, { onMissing: 'skip' })

    res.status(200)
    res.json({
      request: {
        eventId,
        traceId,
      },
      result,
    })
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
