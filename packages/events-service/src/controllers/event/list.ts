import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { between, equals } from '@aws/dynamodb-expressions'
import { logger } from '../../core/logger'
import { db } from '../../core/db'
import { AppRequest, ReqUser } from '../../types/request'
import { DecoratedEvents } from '../../services/decorated-events'
import { EventListQuery } from '../../types/event-list-query'
import { EventStatus } from '../../schemas/event-status.schema'

const getOutstandingEvents = async (query: EventListQuery, user: ReqUser): Promise<EventStatus[]> => {
  if (user?.clientCode !== query.clientCode) {
    throw new Error('Unauthorized clientCode')
  }

  const keyCondition = {
    clientCode: query.clientCode,
    eventCreatedAt: between(query.dateFrom, query.dateTo),
  }

  const queryConditons = {
    indexName: 'EventStatusesByClientCodeAndEventCreatedDate',
    filter: {
      subject: 'status',
      ...equals('outstanding'),
    },
  }

  const iterator = db.query(EventStatus, keyCondition, queryConditons)
  // db.query (from dynamodb) returns an async iterator, so await each item in
  // the iterator to extract the results
  const records = [] as EventStatus[]
  for await (const record of iterator) records.push(record)
  return records
}

export default async (req: AppRequest, res: Response) => {
  const query = req.query as EventListQuery
  const { traceId, user } = req

  try {
    logger.info('Retrieve decorated events...', { traceId, query })

    const outstandingEvents = await getOutstandingEvents(query, user)
    const events = await new DecoratedEvents(traceId).retrieveByEventStatusList(outstandingEvents)

    return res.json(events)
  } catch (error) {
    logger.error('Error retrieving decorated events', stringifyError(error))

    res.status(400)
    return res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
