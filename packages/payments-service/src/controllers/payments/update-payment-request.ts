import { FunctionExpression, AttributePath } from '@aws/dynamodb-expressions'
import { Response } from 'express'
import { db } from '../../core/db'
import { generateApiKey } from '../../core/schema'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/node-utils'

export const createAccount = async (req: AppRequest, res: Response) => {
  try {
    const { traceId } = req
    // const { customerCode, userName } = JSON.parse(state)
    // if (!customerCode || !userName) throw new Error('Customer Code and Username are required')
    const itemToCreate = generateApiKey({})
    const result = await db.put(itemToCreate, {
      condition: {
        type: 'And',
        conditions: [
          new FunctionExpression('attribute_not_exists', new AttributePath('customerCode')),
          new FunctionExpression('attribute_not_exists', new AttributePath('accountId')),
          new FunctionExpression('attribute_not_exists', new AttributePath('userName')),
        ],
      },
    })

    logger.info('Created account successfully', { traceId, result })

    return res.redirect(301, process.env.CLIENT_URL)
  } catch (err) {
    logger.error('CreateAccountError', {
      traceId: req.traceId,
      error: stringifyError(err),
      headers: JSON.stringify(req.headers),
    })
    return res.send({
      message: err.message,
      code: err.code,
      traceId: req.traceId,
    })
  }
}
