import { Response } from 'express'
import { AppRequest } from '@reapit/node-utils'
import { createConfigValue } from '../services/create-ssm-config'
import logger from '../core/logger'

export const createConfig = async (req: AppRequest, res: Response) => {
  try {
    const { configKey, configValue } = req.body
    if (!configKey || !configValue) {
      throw new Error('Missing key or value parameters')
    }

    await createConfigValue(configKey, configValue)
    logger.info('Created value for config key: ', configKey)
    res.status(200)
    return res.send({ response: 'Config saved' })
  } catch (err) {
    logger.error('Error creating config', { traceId: req.traceId, error: err })
    res.status(400)
    res.send({ errors: err.message })
  }
}
