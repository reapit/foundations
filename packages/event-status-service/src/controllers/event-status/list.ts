import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/utils'
import { db } from '../../core/db'
import { EventStatus } from '../../schemas/event-status.schema'
import { between } from '@aws/dynamodb-expressions'

export const listStatuses = async (req: AppRequest, res: Response) => {
  const dateFrom = req.query.dateFrom as string | undefined
  const dateTo = req.query.dateTo as string | undefined
  const clientCode = req.query.clientCode as string | undefined
  const { traceId } = req

  try {
    logger.info('Getting statuses by parmeters...', { traceId, dateFrom, dateTo, clientCode })

    const keyCondition = {
      partitionKey: 'statusCreatedAt',
      rangeKey: between(dateFrom, dateFrom),
    }

    // attempt to retrieve from DB
    const iterator = db.query(EventStatus, keyCondition)

    for await (const record of iterator) {
      console.log(record, iterator.count, iterator.scannedCount)
    }

    res.status(200)
    return res.json({
      request: {
        dateFrom,
        dateTo,
        clientCode,
        traceId,
      },
    })
  } catch (error) {
    logger.error('Error retrieving statuses', stringifyError(error))

    if (error.name === 'ItemNotFoundException') {
      res.status(200)
      return res.json({
        error: 'No statuses found for given parameters',
        code: 404,
      })
    }

    res.status(400)
    return res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
