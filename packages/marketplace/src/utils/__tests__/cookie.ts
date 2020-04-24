import hardtack from 'hardtack'
import { getCookieString, setCookieString, COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE } from '../cookie'

describe('cookie utils', () => {
  describe('getCookieString', () => {
    it('should get a session from the cookie if it exists', () => {
      document.cookie = `${COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE}=${COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE}`
      expect(getCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE)).toEqual(
        COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE,
      )
    })
    it('should return null if no cookie', () => {
      document.cookie = `${COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE}=`
      expect(getCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE)).toEqual('')
    })
  })

  describe('setCookieString', () => {
    it('should set a cookie if host is in the whitelist array', () => {
      const validHost = 'https://something.reapit.cloud'
      hardtack.set = jest.fn()
      const now = new Date()
      setCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE, now, 10, validHost)
      expect(hardtack.set).toHaveBeenCalledWith(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE, now.toString(), {
        path: '/',
        domain: '.reapit.cloud',
        samesite: 'lax',
        maxAge: 10,
      })
    })
    it('should not set a cookie if host is not in the whitelist array', () => {
      const inValidHost = 'https://something.com'
      hardtack.set = jest.fn()
      const now = new Date()
      setCookieString(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE, now, 10, inValidHost)
      expect(hardtack.set).not.toHaveBeenCalled()
    })
  })
})
