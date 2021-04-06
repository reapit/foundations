import { Response } from 'express'
import { stringifyError } from '@reapit/node-utils'
import { logger } from '../../core/logger'
import { AppRequest } from '../../types/request'
import { db } from '../../core/db'
import { generateStatusItem } from '../../schemas/event-status.schema'
import { HttpStatusCodeEnum } from '@/types/http.status.enum'

export default async (req: AppRequest, res: Response) => {
  const eventId = req.params.eventId as string | undefined
  const { traceId } = req

  try {
    logger.info('Getting status by eventId...', { traceId, eventId })

    const itemToGet = generateStatusItem({ eventId })
    const result = await db.get(itemToGet)

    if (result.clientCode !== req.user?.clientCode) {
      res.status(HttpStatusCodeEnum.UNAUTHORIZED)
      return res.json({
        error: 'Unauthorized',
        code: HttpStatusCodeEnum.UNAUTHORIZED,
      })
    }

    res.status(HttpStatusCodeEnum.OK)
    return res.json(result)
  } catch (error) {
    logger.error('Error retrieving status', stringifyError(error))

    if (error.name === 'ItemNotFoundException') {
      res.status(HttpStatusCodeEnum.OK)
      return res.json({
        error: `Status not found for ${eventId}`,
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
