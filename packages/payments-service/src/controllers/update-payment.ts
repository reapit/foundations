import { AppRequest } from '@reapit/node-utils'
import { Response } from 'express'
import { db } from '../core/db'
import { logger } from '../core/logger'
import { generateApiKey } from '../core/schema'
import { validateApiKey, validatePaymentUpdate } from '../core/validators'
import { updatePlatformPayment } from '../services/update-payment'

export const updatePayment = async (req: AppRequest, res: Response) => {
  const apiKey: string | undefined = req.headers['x-api-key'] as string
  const clientCode: string | undefined = req.headers['reapit-customer'] as string
  const apiVersion: string | undefined = req.headers['api-version'] as string
  const eTag: string | undefined = req.headers['if-match'] as string

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

    logger.info('Payment retrieved from DB', { traceId, validated })

    if (validated) {
      const payment = await updatePlatformPayment(validated, validatedPayment, apiVersion, eTag)
      if (validatedPayment.status === 'posted') {
        // If the payment posted I want to invalidate the session in 5 mins to prevent the user re-using the token
        const itemToUpdate = generateApiKey({
          ...validated,
          keyExpiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
        })
        const updated = await db.put(itemToUpdate)
        logger.info('Successfully invalidated API key', { traceId, updated })
      }
      if (payment) {
        res.status(204)
        return res.end()
      }
    }
  } catch (error) {
    logger.error('Error updating account', { traceId, error })

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
