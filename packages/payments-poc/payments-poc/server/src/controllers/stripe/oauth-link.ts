import { STRIPE_OAUTH_URL } from '../../core/constants'
import {
  AppRequest,
  AppResponse,
  logger,
  stringifyError,
} from '../../core/logger'

export const stripeOauthLink = async (req: AppRequest, res: AppResponse) => {
  console.log('here I am')
  try {
    const { customerCode } = req.params
    const { userName } = req.query
    if (!customerCode || !userName)
      throw new Error('customerCode and userName are required')

    const state = JSON.stringify({
      customerCode,
      userName,
    })
    req.session.state = state

    const args = new URLSearchParams({
      state: state as string,
      client_id: process.env.STRIPE_CLIENT_ID,
    })
    const url = `${STRIPE_OAUTH_URL}?${args.toString()}`
    return res.send({ url })
  } catch (err) {
    const error = {
      code: err.code,
      traceId: req.traceId,
      headers: req.headers,
    }
    logger.error(`Error fetching stripe url ${stringifyError(error)}`)
    res.status(400)
    res.json(error)
  }
}
