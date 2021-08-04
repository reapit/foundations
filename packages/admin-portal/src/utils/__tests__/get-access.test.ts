import Routes from '../../constants/routes'
import { ReapitConnectSession } from '@reapit/connect-session'
import { getAccess } from '../get-access'

describe('getAccess', () => {
  it('should return false if no access permissions', () => {
    window.reapit.config.limitedUserAccessWhitelist = []
    const mockSession = {
      loginIdentity: {
        email: 'foo@bar.com',
        groups: [],
      },
    } as unknown as ReapitConnectSession

    const hasAccess = getAccess(mockSession, Routes.ROOT)

    expect(hasAccess).toBe(false)
  })

  it('should return true if has access permissions', () => {
    window.reapit.config.limitedUserAccessWhitelist = []
    const mockSession = {
      loginIdentity: {
        email: 'foo@bar.com',
        groups: ['ReapitEmployeeFoundationsAdmin'],
      },
    } as unknown as ReapitConnectSession

    const hasAccess = getAccess(mockSession, Routes.ROOT)

    expect(hasAccess).toBe(true)
  })

  it('should return true if has access permissions and limited access with a whitelisted root', () => {
    window.reapit.config.limitedUserAccessWhitelist = ['foo@bar.com']
    const mockSession = {
      loginIdentity: {
        email: 'foo@bar.com',
        groups: ['ReapitEmployeeFoundationsAdmin'],
      },
    } as unknown as ReapitConnectSession

    const hasAccess = getAccess(mockSession, Routes.ROOT)

    expect(hasAccess).toBe(true)
  })

  it('should return false if has access permissions and limited access but not a whitelisted root', () => {
    window.reapit.config.limitedUserAccessWhitelist = ['foo@bar.com']
    const mockSession = {
      loginIdentity: {
        email: 'foo@bar.com',
        groups: ['ReapitEmployeeFoundationsAdmin'],
      },
    } as unknown as ReapitConnectSession

    const hasAccess = getAccess(mockSession, Routes.APPROVALS)

    expect(hasAccess).toBe(false)
  })
})
