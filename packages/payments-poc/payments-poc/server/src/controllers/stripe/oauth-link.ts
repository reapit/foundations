import { STRIPE_OAUTH_URL } from '../../core/constants'
import { AppRequest, AppResponse } from '../../core/logger'

export const stripeOauthLink = async (req: AppRequest, res: AppResponse) => {
  const state = req.params.customerId
  req.session.state = state

  const args = new URLSearchParams({
    state: state as string,
    client_id: process.env.STRIPE_CLIENT_ID,
  })
  const url = `${STRIPE_OAUTH_URL}?${args.toString()}`
  return res.send({ url })
}
