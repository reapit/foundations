import { AppRequest, AppResponse, logger, stringifyError } from '../../core/logger'
import { stripe } from '../../core/stripe'
import { createAccount } from '../account/create-account'

export const authorizeStripe = async (req: AppRequest, res: AppResponse) => {
  const { code, state } = req.query

  try {
    const stripeAccount = await stripe.oauth.token({
      grant_type: 'authorization_code',
      code: code as string,
    })

    const accountId = stripeAccount.stripe_user_id

    return createAccount(req, res, accountId, state as string)
  } catch (err) {
    if (err.type === 'StripeInvalidGrantError') {
      logger.error('Invalid authorization code: ' + code, {
        traceId: req.traceId,
        error: stringifyError(err),
      })
      return res.status(400).json({ error: 'Invalid authorization code: ' + code })
    } else {
      logger.error('An unknown error occurred.', {
        traceId: req.traceId,
        error: stringifyError(err),
      })
      return res.status(500).json({ error: 'An unknown error occurred.' })
    }
  }
}
