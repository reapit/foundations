import hardtack from 'hardtack'

export const COOKIE_FIRST_TIME_LOGIN = 'reapit-first-login-complete'
export const COOKIE_DOMAIN_WHITELIST = ['.reapit.com', 'localhost']

export const getCookieString = (key: string): string => {
  try {
    const cookie = hardtack.get(key) as string
    return cookie
  } catch {
    return ''
  }
}

export const setCookieString = (key, value, href = window.location.href): void => {
  const whitelistedHost = COOKIE_DOMAIN_WHITELIST.filter(item => href.includes(item))[0]

  if (whitelistedHost) {
    hardtack.set(key, value, {
      path: '/',
      domain: whitelistedHost,
      samesite: 'lax',
    })
  }
}
