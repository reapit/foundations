import { AppRequest, stringifyError } from '@reapit/node-utils'
import { Response, NextFunction } from 'express'
import { db } from '../core/db'
import { logger } from '../core/logger'
import { generateApiKey } from '../core/schema'
import { validateApiKey } from '../core/validators'

export const invalidateApiKey = async (req: AppRequest, res: Response, next: NextFunction, testApiKey?: string) => {
  const apiKey: string | undefined = testApiKey ?? req.headers['x-api-key']
  const clientCode: string | undefined = req.headers['reapit-customer']
  const { paymentId } = req.params
  const { traceId } = req

  try {
    if (!apiKey) {
      res.status(403)
      return res.json({
        error: 'API key not supplied',
        code: 403,
      })
    }
    if (!paymentId) throw new Error('paymentId is a required parameter')

    const itemToGet = generateApiKey({ apiKey })
    const fetchedKey = await db.get(itemToGet)
    const validated = validateApiKey(fetchedKey, traceId, clientCode, paymentId)

    logger.info('Payment retrieved from DB', { traceId, validated })

    if (validated) {
      const apiKeyObject = generateApiKey({
        ...validated,
        keyExpiresAt: new Date().toISOString(),
      })

      logger.info('Invalidating api key', { traceId, apiKeyObject })

      const result = await db.put(apiKeyObject)

      logger.info('Successfully invalidated API key', { traceId, result })

      res.status(204)
      res.json({
        apiKey,
      })
    }
  } catch (error) {
    logger.error('Error invalidating API Key', stringifyError(error))

    res.status(error.status ?? 400)
    res.json({
      error: `Bad request ${error.message ?? error}`,
      code: 400,
    })
  }
}
