import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { generateStatusItem } from '../../schemas/event-status.schema'
import { db } from '../../core/db'
import createEventStatus from './create'
import updateStatusById from './update'
import { HttpStatusCodeEnum } from '@/types/http.status.enum'

export default async (req: AppRequest, res: Response) => {
  const eventId = req.body.eventId as string | undefined
  const { traceId } = req

  try {
    logger.info('Updating status by statusId...', { traceId, eventId })

    const itemToGet = generateStatusItem({ eventId })
    await db.get(itemToGet)

    // update if there is no ItemNotFoundException error
    // (i.e. a status already exists for this eventID)
    // move the eventId from the body onto the url params as that is where
    // the update controller will be looking for it
    req.params.eventId = eventId
    return updateStatusById(req, res)
  } catch (error) {
    // if a status for the eventID doesn't exist, create it
    if (error.name === 'ItemNotFoundException') {
      return createEventStatus(req, res)
    }

    logger.error('Error upserting status', stringifyError(error))
    res.status(HttpStatusCodeEnum.BAD_REQUEST)
    res.json({
      error: `Bad request ${error}`,
      code: HttpStatusCodeEnum.BAD_REQUEST,
    })
  }
}
