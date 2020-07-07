import hardtack from 'hardtack'
import { getCookieString, setCookieString, COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE } from '../cookie'

describe('cookie utils', () => {
  describe('getCookieString', () => {
    it('should get a session from the cookie if it exists', () => {
      // eslint-disable-next-line max-len
      document.cookie = `development-${COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE}=${COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE}`
      expect(getCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE, 'development')).toEqual(
        COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE,
      )
    })
    it('should return null if no cookie', () => {
      document.cookie = `development-${COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE}=`
      expect(getCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE, 'development')).toEqual('')
    })
  })

  describe('setCookieString', () => {
    it('should set a cookie if host is in the whitelist array', () => {
      const validHost = 'https://something.reapit.cloud'
      hardtack.set = jest.fn()
      const now = new Date()
      setCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE, now, 10, validHost, 'development')
      expect(hardtack.set).toHaveBeenCalledWith(
        `development-${COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE}`,
        now.toString(),
        {
          path: '/',
          domain: '.reapit.cloud',
          samesite: 'lax',
          maxAge: 10,
        },
      )
    })
    it('should not set a cookie if host is not in the whitelist array', () => {
      const inValidHost = 'https://something.com'
      hardtack.set = jest.fn()
      const now = new Date()
      setCookieString(`development-${COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE}`, now, 10, inValidHost, 'development')
      expect(hardtack.set).not.toHaveBeenCalled()
    })
  })
})
