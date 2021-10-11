import hardtack from 'hardtack'
import { getCookieString, setCookieString, COOKIE_DEVELOPER_TERMS_ACCEPTED } from '../cookie'

describe('cookie utils', () => {
  describe('getCookieString', () => {
    it('should get a session from the cookie if it exists', () => {
      // eslint-disable-next-line max-len
      document.cookie = `development-${COOKIE_DEVELOPER_TERMS_ACCEPTED}=${COOKIE_DEVELOPER_TERMS_ACCEPTED}`
      expect(getCookieString(COOKIE_DEVELOPER_TERMS_ACCEPTED, 'development')).toEqual(COOKIE_DEVELOPER_TERMS_ACCEPTED)
    })
    it('should return null if no cookie', () => {
      document.cookie = `development-${COOKIE_DEVELOPER_TERMS_ACCEPTED}=`
      expect(getCookieString(COOKIE_DEVELOPER_TERMS_ACCEPTED, 'development')).toEqual('')
    })
  })

  describe('setCookieString', () => {
    it('should set a cookie if host is in the whitelist array', () => {
      const validHost = 'https://something.reapit.cloud'
      hardtack.set = jest.fn()
      const now = new Date()
      setCookieString(COOKIE_DEVELOPER_TERMS_ACCEPTED, now, 10, validHost, 'development')
      expect(hardtack.set).toHaveBeenCalledWith(`development-${COOKIE_DEVELOPER_TERMS_ACCEPTED}`, now.toString(), {
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
      setCookieString(`development-${COOKIE_DEVELOPER_TERMS_ACCEPTED}`, now, 10, inValidHost, 'development')
      expect(hardtack.set).not.toHaveBeenCalled()
    })
  })
})
