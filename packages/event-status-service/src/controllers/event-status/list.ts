import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { between, equals } from '@aws/dynamodb-expressions'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { db } from '../../core/db'
import { EventStatus } from '../../schemas/event-status.schema'

export default async (req: AppRequest, res: Response) => {
  const dateFrom = req.query.dateFrom as string | undefined
  const dateTo = req.query.dateTo as string | undefined
  const clientCode = req.query.clientCode as string | undefined
  const status = req.query.status as string
  const { traceId } = req

  try {
    logger.info('Getting statuses by parmeters...', { traceId, dateFrom, dateTo, clientCode })

    if (req.user?.clientCode !== clientCode) {
      res.status(401)
      return res.json({
        error: 'Unauthorized',
        code: 401,
      })
    }

    const keyCondition = {
      clientCode,
      eventCreatedAt: between(dateFrom, dateTo),
    }

    const queryConditons = {
      indexName: 'EventStatusesByClientCodeAndEventCreatedDate',
      filter: undefined,
    }

    if (status)
      queryConditons.filter = {
        subject: 'status',
        ...equals(status),
      }

    const iterator = db.query(EventStatus, keyCondition, queryConditons)
    const responeRecords = []
    for await (const record of iterator) {
      responeRecords.push(record)
    }

    res.status(200)
    return res.json(responeRecords)
  } catch (error) {
    logger.error('Error retrieving statuses', stringifyError(error))

    res.status(400)
    return res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
