import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { db } from '../../core/db'
import { generateAutomationItem } from '../../schemas/automation.schema'
import { HttpStatusCodeEnum } from '@/types/http.status.enum'

export default async (req: AppRequest, res: Response) => {
  const id = req.params.id as string | undefined
  const { traceId } = req

  try {
    logger.info('Deleting automation by id...', { traceId, id })

    const item = generateAutomationItem({ id })
    const result = await db.get(item)

    if (result.clientCode !== req.user?.clientCode) {
      res.status(HttpStatusCodeEnum.UNAUTHORIZED)
      return res.json({
        error: 'Unauthorized',
        code: HttpStatusCodeEnum.UNAUTHORIZED,
      })
    }

    await db.delete(item)

    return res.status(HttpStatusCodeEnum.NO_CONTENT).send()
  } catch (error) {
    logger.error('Error retrieving automation', stringifyError(error))

    if (error.name === 'ItemNotFoundException') {
      res.status(HttpStatusCodeEnum.OK)
      return res.json({
        error: `Automation not found for ${id}`,
        code: HttpStatusCodeEnum.NOT_FOUND,
      })
    }

    res.status(HttpStatusCodeEnum.BAD_REQUEST)
    res.json({
      error: `Bad request ${error}`,
      code: HttpStatusCodeEnum.BAD_REQUEST,
    })
  }
}
