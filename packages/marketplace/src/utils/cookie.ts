import hardtack from 'hardtack'
import config from '../../config.json'

// cookie 10 years
export const COOKIE_MAX_AGE_INFINITY = 60 * 60 * 24 * 365 * 10

export const COOKIE_FIRST_SUBMIT = 'reapit-read-docs'

export const COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE = 'reapit-developer-first-login-complete'
export const COOKIE_DEVELOPER_TERMS_ACCEPTED = 'reapit-developer-term-accepted'

export const COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE = 'reapit-client-first-login-complete'
export const COOKIE_CLIENT_TERMS_ACCEPTED = 'reapit-client-term-accepted'

export const COOKIE_DOMAIN_WHITELIST = ['.reapit.cloud', 'localhost']

export const getCookieString = (key: string, appEnv?: string): string => {
  try {
    const env = appEnv ?? config.appEnv
    const keyWithEnv = env ? `${env}-${key}` : key
    const cookie = hardtack.get(keyWithEnv) as string
    return cookie
  } catch {
    return ''
  }
}

export const setCookieString = (
  key: string,
  value: string | Date,
  maxAge?: number,
  href?: string,
  appEnv?: string,
): void => {
  const hrefString = href ?? window.location.href
  const whitelistedHost = COOKIE_DOMAIN_WHITELIST.filter(item => hrefString.includes(item))[0]
  const env = appEnv ?? config.appEnv
  const keyWithEnv = env ? `${env}-${key}` : key

  if (whitelistedHost) {
    hardtack.set(keyWithEnv, value.toString(), {
      path: '/',
      domain: whitelistedHost,
      samesite: 'lax',
      maxAge,
    })
  }
}
