import { Response } from 'express'
import { AppRequest } from '@reapit/node-utils'
import { deleteConfigValue } from '../services/delete-ssm-config'
import logger from '../core/logger'

export const deleteConfig = async (req: AppRequest, res: Response) => {
  try {
    const { configKey } = req.params
    if (!configKey) {
      throw new Error('No config key provided')
    }
    await deleteConfigValue(configKey)
    logger.info('Deleted value for config key: ', configKey)
    res.status(200)
    return res.send({ response: `Deleted value for ${configKey}` })
  } catch (err) {
    logger.error('Error deleting config', { traceId: req.traceId, error: err })
    res.status(400)
    res.send({ errors: err.message })
  }
}
