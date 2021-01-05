import { AppRequest, stringifyError } from '@reapit/node-utils'
import { Response } from 'express'
import { db } from '../../core/db'
import { logger } from '../../core/logger'
import { generateApiKey } from '../../core/schema'

export const getAccount = async (req: AppRequest, res: Response) => {
  const clientCode = req.params.clientCode as string | undefined
  const { traceId } = req

  try {
    logger.info('Getting config by customerId...', { traceId, clientCode })
    const itemToGet = generateApiKey({ clientCode })
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
        error: `Account not found for ${clientCode}`,
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
