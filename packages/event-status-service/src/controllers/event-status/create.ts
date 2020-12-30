import { Response } from 'express'
import { logger } from '../../core/logger'
import { AppRequest, stringifyError } from '@reapit/utils'

export const createEventStatus = async (req: AppRequest, res: Response) => {
  const payload = req.body as object
  const { traceId } = req

  try {
    logger.info('Create new status...', { traceId, payload })

    // attempt to retrieve from DB

    res.status(200)
    res.json({
      status: {
        payload,
        traceId,
      },
    })
  } catch (error) {
    logger.error('Error creating status', stringifyError(error))

    res.status(400)
    res.json({
      error: `Bad request ${error}`,
      code: 400,
    })
  }
}
