import { generateAccountLink } from './utils'
import { AppRequest, AppResponse } from '../../core/logger'

export const stripeOnboardUserRefresh = async (req: AppRequest, res: AppResponse) => {
  if (!req.session.accountID) {
    res.redirect('/')
    return
  }
  try {
    const { accountID } = req.session
    const origin = `${req.secure ? 'https://' : 'https://'}${req.headers.host}`

    const accountLinkURL = await generateAccountLink(accountID, origin)
    res.redirect(accountLinkURL)
  } catch (err) {
    res.status(500).send({
      error: err.message,
    })
  }
}
