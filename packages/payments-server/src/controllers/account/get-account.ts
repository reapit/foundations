import { Response } from 'express'
import { db } from '../../core/db'
import { logger, AppRequest, stringifyError } from '../../core/logger'
import { generatePaymentsItem } from '../../core/schema'

export const getAccount = async (req: AppRequest, res: Response) => {
  const customerCode = req.params.customerCode as string | undefined
  const { traceId } = req

  try {
    logger.info('Getting config by customerId...', { traceId, customerCode })
    const itemToGet = generatePaymentsItem({ customerCode })
    const result = await db.get(itemToGet)
    logger.info('Get config by customerId successfully', { traceId, result })

    res.status(200)
    res.json({
      account: result,
    })
  } catch (error) {
    logger.error('Error retrieving account', stringifyError(error))
    if (error.name === 'ItemNotFoundException') {
      res.status(200)
      return res.json({
        error: `Account not found for ${customerCode}`,
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
