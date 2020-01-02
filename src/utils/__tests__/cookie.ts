import hardtack from 'hardtack'
import { getCookieString, setCookieString, COOKIE_FIRST_TIME_LOGIN } from '../cookie'

describe('cookie utils', () => {
  describe('getCookieString', () => {
    it('should get a session from the cookie if it exists', () => {
      document.cookie = `${COOKIE_FIRST_TIME_LOGIN}=${COOKIE_FIRST_TIME_LOGIN}`
      expect(getCookieString(COOKIE_FIRST_TIME_LOGIN)).toEqual(COOKIE_FIRST_TIME_LOGIN)
    })
    it('should return null if no cookie', () => {
      document.cookie = `${COOKIE_FIRST_TIME_LOGIN}=`
      expect(getCookieString(COOKIE_FIRST_TIME_LOGIN)).toEqual('')
    })
  })

  describe('setCookieString', () => {
    it('should set a cookie if host is in the whitelist array', () => {
      const validHost = 'https://something.reapit.com'
      hardtack.set = jest.fn()
      setCookieString(COOKIE_FIRST_TIME_LOGIN, COOKIE_FIRST_TIME_LOGIN, validHost)
      expect(hardtack.set).toHaveBeenCalledWith(COOKIE_FIRST_TIME_LOGIN, COOKIE_FIRST_TIME_LOGIN, {
        path: '/',
        domain: '.reapit.com',
        expires: new Date(Date.now() + 30 * 24 * 3600 * 1000).toUTCString(),
        samesite: 'lax'
      })
    })
    it('should not set a cookie if host is not in the whitelist array', () => {
      const inValidHost = 'https://something.com'
      hardtack.set = jest.fn()
      setCookieString(COOKIE_FIRST_TIME_LOGIN, COOKIE_FIRST_TIME_LOGIN, inValidHost)
      expect(hardtack.set).not.toHaveBeenCalled()
    })
  })
})
