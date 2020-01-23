import { COOKIE_DOMAIN_WHITELIST, COOKIE_SESSION_KEY } from '../utils/cognito'
import hardtack from 'hardtack'

export const removeSession = (href = window.location.href): void => {
  const whitelistedHost = COOKIE_DOMAIN_WHITELIST.filter(item => href.includes(item))[0]

  if (whitelistedHost) {
    hardtack.remove(COOKIE_SESSION_KEY, {
      path: '/',
      domain: whitelistedHost,
    })
  }
}
