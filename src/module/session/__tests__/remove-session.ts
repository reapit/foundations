import { removeSession } from '../remove-session'
import hardtack from 'hardtack'
import { COOKIE_SESSION_KEY } from '../../../utils/cognito'

describe('removeSession', () => {
  it('should remove a session cookie for a valid host', () => {
    const validHost = 'https://something.reapit.com'
    hardtack.remove = jest.fn()

    removeSession(validHost)

    expect(hardtack.remove).toHaveBeenCalledWith(COOKIE_SESSION_KEY, {
      path: '/',
      domain: '.reapit.com'
    })
  })

  it('should do nothing for an invalid host', () => {
    const inValidHost = 'https://something.com'
    hardtack.remove = jest.fn()

    removeSession(inValidHost)

    expect(hardtack.remove).not.toHaveBeenCalled()
  })
})
