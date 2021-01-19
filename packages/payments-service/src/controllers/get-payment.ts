import { AppRequest } from '@reapit/node-utils'
import { Response } from 'express'
import { db } from '../core/db'
import { logger } from '../core/logger'
import { generateApiKey } from '../core/schema'
import { validateApiKey } from '../core/validators'
import { getPlatformPayment } from '../services/get-payment'

export const getPayment = async (req: AppRequest, res: Response) => {
  const apiKey: string | undefined = req.headers['x-api-key']
  const clientCode: string | undefined = req.headers['reapit-customer']
  const apiVersion: string | undefined = req.headers['api-version']
  const { paymentId } = req.params
  const { traceId } = req

  try {
    if (!clientCode || !apiKey || !apiVersion)
      throw new Error('reapit-customer, api-version and x-api-key are required headers')
    if (!paymentId) throw new Error('paymentId is a required parameter')

    logger.info('Payment request valid, retrieving from DB', { traceId, apiKey, paymentId })

    const itemToGet = generateApiKey({ apiKey })
    const result = await db.get(itemToGet)
    const validated = validateApiKey(result, traceId, clientCode, paymentId)

    logger.info('Payment retrieved from DB', { traceId, validated })

    if (validated) {
      const payment = await getPlatformPayment(validated, apiVersion)

      if (payment) {
        res.status(200)
        return res.json({
          payment,
        })
      }
    }
  } catch (error) {
    logger.error('Error retrieving account', error)

    if (error.name === 'ItemNotFoundException') {
      res.status(404)
      return res.json({
        error: `Payment not found for apiKey ${apiKey} paymentId: ${paymentId}`,
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
