import { AppRequest, stringifyError } from '@reapit/node-utils'
import { Response } from 'express'
import { db } from '../core/db'
import { logger } from '../core/logger'
import { generateApiKey } from '../core/schema'
import uuid from 'uuid/v4'

export const createApiKey = async (req: AppRequest, res: Response, apiKey = uuid()) => {
  const { clientCode, paymentId, keyExpiresAt } = req.body
  const { traceId } = req

  try {
    if (!clientCode || !paymentId || !keyExpiresAt)
      throw new Error('clientCode, paymentId, entityType and keyExpiresAt are required')

    const apiKeyObject = generateApiKey({
      apiKey,
      clientCode,
      paymentId,
      keyCreatedAt: new Date().toISOString(),
      keyExpiresAt,
    })
    logger.info('Creating API key', { traceId, apiKeyObject })

    const result = await db.put(apiKeyObject)

    logger.info('Successfully created API key', { traceId, result })

    res.status(201)
    res.json({
      apiKey: apiKey,
    })
  } catch (error) {
    logger.error('Error creating API Key', stringifyError(error))

    res.status(error.status ?? 400)
    res.json({
      error: `Bad request ${error.message ?? error}`,
      code: 400,
    })
  }
}
