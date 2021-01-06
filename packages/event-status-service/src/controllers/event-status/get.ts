import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'
import { db } from '../../core/db'
import { generateStatusItem } from '../../schemas/event-status.schema'

export const getStatusById = async (req: AppRequest, res: Response) => {
  const eventId = req.params.eventId as string | undefined
  const { traceId } = req

  try {
    logger.info('Getting status by eventId...', { traceId, eventId })

    const itemToGet = generateStatusItem({ eventId })
    const result = await db.get(itemToGet)

    res.status(200)
    res.json({
      request: {
        eventId,
        traceId,
      },
      result,
    })
  } catch (error) {
    logger.error('Error retrieving status', stringifyError(error))

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
