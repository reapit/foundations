import { Response } from 'express'
import { db } from '../../core/db'
import { logger, AppRequest } from '../../core/logger'
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
    console.log('Get Account error', error.message)
  }
}
