import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/utils'

export const listStatuses = async (req: AppRequest, res: Response) => {
  const dateFrom = req.query.dateFrom as string | undefined
  const dateTo = req.query.dateTo as string | undefined
  const clientCode = req.query.clientCode as string | undefined
  const { traceId } = req

  try {
    logger.info('Getting statuses by parmeters...', { traceId, dateFrom, dateTo, clientCode })

    // attempt to retrieve from DB

    res.status(200)
    return res.json({
      status: {
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
