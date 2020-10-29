import { AppRequest, AppResponse } from '../../core/logger'
import { stripe } from '../../core/stripe'
import { generateAccountLink } from './utils'

export const stripeOnboardUser = async (req: AppRequest, res: AppResponse) => {
  try {
    const account = await stripe.accounts.create({ type: 'express' })
    req.session.accountID = account.id

    const origin = `${req.headers.origin}`
    const accountLinkURL = await generateAccountLink(account.id, origin)
    res.send({ url: accountLinkURL })
  } catch (err) {
    res.status(500).send({
      error: err.message,
    })
  }
}