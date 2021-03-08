import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { db } from '../../core/db'
import { Automation } from '../../schemas/automation.schema'

export default async (req: AppRequest, res: Response) => {
  const clientCode = req.query.clientCode as string | undefined
  const { traceId } = req

  try {
    logger.info('Getting automations by parmeters...', { traceId, clientCode })

    if (req.user?.clientCode !== clientCode) {
      res.status(401)
      return res.json({
        error: 'Unauthorized',
        code: 401,
      })
    }

    const keyCondition = { clientCode }
    const queryConditons = {
      indexName: 'AutomationsByClientCode',
    }
    const iterator = db.query(Automation, keyCondition, queryConditons)

    const responeRecords = []
    for await (const record of iterator) {
      responeRecords.push(record)
    }

    res.status(200)
    return res.json(responeRecords)
  } catch (error) {
    logger.error('Error retrieving automations', stringifyError(error))

    res.status(400)
    return res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
