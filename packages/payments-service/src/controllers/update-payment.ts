import { AppRequest, stringifyError } from '@reapit/node-utils'
import { Response } from 'express'
import { db } from '../core/db'
import { logger } from '../core/logger'
import { generateApiKey } from '../core/schema'
import { validateApiKey, validatePaymentUpdate } from '../core/validators'
import { updatePlatformPayment } from '../services/update-payment'

export const updatePayment = async (req: AppRequest, res: Response) => {
  const apiKey = req.headers['x-api-key'] as string | undefined
  const clientCode = req.headers['reapit-customer'] as string | undefined
  const apiVersion = req.headers['api-version'] as string | undefined
  const eTag = req.headers['if-match'] as string | undefined
  console.log(req.headers)
  const { paymentId } = req.params
  const { traceId } = req

  try {
    const validatedPayment = validatePaymentUpdate(req.body, traceId)
    if (!clientCode || !apiKey || !apiVersion || !eTag)
      throw new Error('reapit-customer, api-version, _eTag and x-api-key are required headers')
    if (!paymentId) throw new Error('paymentId is a required parameter')

    logger.info('Payment request valid, retrieving from DB', { traceId, apiKey, paymentId })

    const itemToGet = generateApiKey({ apiKey })
    const result = await db.get(itemToGet)
    const validated = validateApiKey(result, traceId, clientCode, paymentId)

    if (validated) {
      const payment = await updatePlatformPayment(validated, validatedPayment, apiVersion, eTag)
      if (payment) {
        res.status(204)
        return res.end()
      }
    }
  } catch (error) {
    logger.error('Error retrieving account', stringifyError(error))

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
