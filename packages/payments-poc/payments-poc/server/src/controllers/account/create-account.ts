import { FunctionExpression, AttributePath } from '@aws/dynamodb-expressions'
import { Response } from 'express'
import { db } from '../../core/db'
import { generatePaymentsItem } from '../../core/schema'
import { logger, AppRequest, stringifyError } from '../../core/logger'

export const createAccount = async (
  req: AppRequest,
  res: Response,
  accountId?: string,
  customerCode?: string
) => {
  try {
    const { traceId } = req
    const itemToCreate = generatePaymentsItem({ accountId, customerCode })
    const result = await db.put(itemToCreate, {
      condition: {
        type: 'And',
        conditions: [
          new FunctionExpression(
            'attribute_not_exists',
            new AttributePath('customerCode')
          ),
          new FunctionExpression(
            'attribute_not_exists',
            new AttributePath('accountId')
          ),
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
