import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/utils'

export const getStatusById = async (req: AppRequest, res: Response) => {
  const statusId = req.params.statusId as string | undefined
  const { traceId } = req

  try {
    logger.info('Getting status by statusId...', { traceId, statusId })

    // attempt to retrieve from DB

    res.status(200)
    res.json({
      status: {
        id: statusId,
        traceId,
      },
    })
  } catch (error) {
    logger.error('Error retrieving status', stringifyError(error))
    if (error.name === 'ItemNotFoundException') {
      res.status(200)
      return res.json({
        error: `Status not found for ${statusId}`,
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
