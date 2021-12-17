import { AppRequest, stringifyError } from '@reapit/utils-node'
import { Response, NextFunction } from 'express'
import { db } from '../core/db'
import { logger } from '../core/logger'
import { generateApiKey } from '../core/schema'
import { v4 as uuid } from 'uuid'

export const createApiKey = async (req: AppRequest, res: Response, next: NextFunction, apiKey = uuid()) => {
  const { clientCode, paymentId, keyExpiresAt } = req.body

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

    const result = await db.put(apiKeyObject)

    res.status(201)
    res.json({
      apiKey,
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
