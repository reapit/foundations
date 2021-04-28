import { Response } from 'express'
import { AppRequest } from '@reapit/node-utils'
import { fetchConfigValue } from '../services/fetch-ssm-config'
import { connectSessionVerifyDecodeIdToken } from '@reapit/connect-session'
import logger from '../core/logger'

export const fetchConfig = async (req: AppRequest, res: Response) => {
  try {
    const { configKey } = req.params
    const { authorization } = req.headers
    if (!configKey || !authorization) {
      throw new Error('Must have the config key and authorization header')
    }

    const userPool = process.env.CONNECT_USER_POOL
    const data = await connectSessionVerifyDecodeIdToken(authorization, userPool)
    const clientCode = data?.clientId

    if (!clientCode) {
      throw new Error('Must be authorised to find client code and fetch config')
    }

    const configValue = await fetchConfigValue(`${clientCode}/${configKey}`)
    logger.info('Retrieved value for config key: ', configKey)
    res.status(200)
    return res.send({ response: configValue })
  } catch (err) {
    logger.error('Error retrieving config', { traceId: req.traceId, error: err })
    res.status(400)
    res.send({ errors: err.message })
  }
}
