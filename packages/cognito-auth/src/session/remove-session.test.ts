import { removeSession } from './remove-session'
import hardtack from 'hardtack'
import { COOKIE_SESSION_KEY } from '../utils/cognito'

describe('removeSession', () => {
  it('should remove a session cookie for a valid host', () => {
    window.location.hostname = 'something.reapit.com'
    hardtack.remove = jest.fn()

    removeSession()

    expect(hardtack.remove).toHaveBeenCalledWith(COOKIE_SESSION_KEY, {
      path: '/',
      domain: window.location.hostname,
    })
  })
  it('should remove a session cookie with appEnv', () => {
    window.location.hostname = 'something.reapit.com'
    hardtack.remove = jest.fn()

    removeSession(COOKIE_SESSION_KEY, 'development')

    expect(hardtack.remove).toHaveBeenCalledWith(`development-${COOKIE_SESSION_KEY}`, {
      path: '/',
      domain: window.location.hostname,
    })
  })
})
