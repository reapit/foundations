import { Response } from 'express'
import { AppRequest } from '@reapit/utils-node'
import { deleteConfigValue } from '../services/delete-ssm-config'
import { connectSessionVerifyDecodeIdToken } from '@reapit/connect-session'
import logger from '../core/logger'

export const deleteConfig = async (req: AppRequest, res: Response) => {
  try {
    const { configKey } = req.params
    if (!configKey) {
      throw new Error('No config key provided')
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

    await deleteConfigValue(`${clientCode}/${configKey}`)
    res.status(200)
    return res.send({ response: 'Deleted value successfully' })
  } catch (err) {
    logger.error('Error deleting config', { traceId: req.traceId, error: err })
    res.status(400)
    res.send({ errors: err.message })
  }
}
