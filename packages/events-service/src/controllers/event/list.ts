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

    const accessToken = req.header('x-access-token')

    const decoratedEventsInstance = new DecoratedEvents(traceId, accessToken)
    // FIRST retrieve revent events from the events API, and then try and decorate
    // with metadata held within this service (status, actions & messages)
    const recentEvents = await decoratedEventsInstance.retrieveByRecentEvents()
    // PLUS, search by event-status first (from this service) and then fill in
    // the events bodies from the API, and continue to add actions & messages.
    // This will probably not be the preffered approach moving forward but is
    // the only way we can test the automation & twilio flow from the front end
    // without having a way to create events properly in the platform events API
    // and have that API trigger the webhook in this service.
    const outstandingEvents = await getOutstandingEvents(query, user)
    const eventsByStatus = await decoratedEventsInstance.retrieveByEventStatusList(outstandingEvents)

    return res.json([...recentEvents, ...eventsByStatus])
  } catch (error) {
    logger.error('Error retrieving decorated events', stringifyError(error))

    res.status(400)
    return res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
