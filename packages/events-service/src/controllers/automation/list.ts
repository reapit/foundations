import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { db } from '../../core/db'
import { Automation } from '../../schemas/automation.schema'
import { HttpStatusCodeEnum } from '@/types/http.status.enum'

export default async (req: AppRequest, res: Response) => {
  const clientCode = req.query.clientCode as string | undefined
  const { traceId } = req

  try {
    logger.info('Getting automations by parmeters...', { traceId, clientCode })

    if (req.user?.clientCode !== clientCode) {
      res.status(HttpStatusCodeEnum.UNAUTHORIZED)
      return res.json({
        error: 'Unauthorized',
        code: HttpStatusCodeEnum.UNAUTHORIZED,
      })
    }

    const keyCondition = { clientCode }
    const queryConditons = {
      indexName: 'AutomationsByClientCode',
    }
    const iterator = db.query(Automation, keyCondition, queryConditons)

    const responseRecords = []
    for await (const record of iterator) {
      responseRecords.push(record)
    }

    res.status(HttpStatusCodeEnum.OK)
    return res.json(responseRecords)
  } catch (error) {
    logger.error('Error retrieving automations', stringifyError(error))

    res.status(HttpStatusCodeEnum.BAD_REQUEST)
    return res.json({
      error: `Bad request ${error}`,
      code: HttpStatusCodeEnum.BAD_REQUEST,
    })
  }
}
