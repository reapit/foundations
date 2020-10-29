import { stripe } from '../../core/stripe'

export const generateAccountLink = async (accountId: string, origin: string) => {
  const link = await stripe.accountLinks.create({
    type: 'account_onboarding',
    account: accountId,
    refresh_url: `${origin}/onboard-user/refresh`,
    return_url: `${origin}/onboard-user/success`,
  })
  return link.url
}
