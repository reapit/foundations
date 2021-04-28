import { Response } from 'express'
import { AppRequest } from '@reapit/node-utils'
import { createConfigValue } from '../services/create-ssm-config'
import { connectSessionVerifyDecodeIdToken } from '@reapit/connect-session'
import logger from '../core/logger'

export const createConfig = async (req: AppRequest, res: Response) => {
  try {
    const { configKey, configValue } = req.body
    if (!configKey || !configValue) {
      throw new Error('Missing key or value parameters')
    }

    const { authorization } = req.headers
    if (!authorization) {
      throw new Error('Must have the authorization header')
    }

    const userPool = process.env.CONNECT_USER_POOL
    const data = await connectSessionVerifyDecodeIdToken(authorization, userPool)
    const clientCode = data?.clientId

    if (!clientCode) {
      throw new Error('Must be authorised to find client code and delete config')
    }

    await createConfigValue(`${clientCode}/${configKey}`, configValue)
    logger.info('Created value for config key: ', configKey)
    res.status(200)
    return res.send({ response: 'Config saved' })
  } catch (err) {
    logger.error('Error creating config', { traceId: req.traceId, error: err })
    res.status(400)
    res.send({ errors: err.message })
  }
}
