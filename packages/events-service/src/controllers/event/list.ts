import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { DecoratedEvents } from '../../services/decorated-events'
import { EventListQuery } from '../../types/event-list-query'

export default async (req: AppRequest, res: Response) => {
  const query = req.query as EventListQuery
  const { traceId, user } = req

  try {
    logger.info('Retrieve decorated events...', { traceId, query })

    const events = await new DecoratedEvents(query, user, traceId).retrieve()

    return res.json(events)
  } catch (error) {
    logger.error('Error retrieving decorated events', stringifyError(error))

    res.status(400).json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
