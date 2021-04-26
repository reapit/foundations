import { Response } from 'express'
import { AppRequest } from '@reapit/node-utils'
import { fetchConfigValue } from '../services/fetch-ssm-config'
import logger from '../core/logger'

export const fetchConfig = async (req: AppRequest, res: Response) => {
  try {
    const { configKey } = req.params
    if (!configKey) {
      throw new Error('No config key provided')
    }
    const configValue = await fetchConfigValue(configKey)
    logger.info('Retrieved value for config key: ', configKey)
    res.status(200)
    return res.send({ response: configValue })
  } catch (err) {
    logger.error('Error retrieving config', { traceId: req.traceId, error: err })
    res.status(400)
    res.send({ errors: err.message })
  }
}
