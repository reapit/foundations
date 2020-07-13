import { renderHook, act } from '@testing-library/react-hooks'
import { RefreshParams } from '@reapit/cognito-auth'
import { useAuth, AuthHook } from '../use-auth'
import mountReactHook from '../__mocks__/mount-react-hook'

const refreshParams: RefreshParams = {
  cognitoClientId: '123',
  loginType: 'CLIENT',
  mode: 'WEB',
  redirectUri: '1',
  authorizationCode: '1',
  refreshToken: '1',
  userName: '1',
  state: null,
}

const session = {
  accessToken: '123',
  accessTokenExpiry: 1583492838,
  idToken: '123',
  idTokenExpiry: 1583492838,
  refreshToken: '123',
  cognitoClientId: '123',
  loginType: 'CLIENT',
  userName: 'cbryan@reapit.com',
  mode: 'WEB',
  loginIdentity: {
    name: 'Craig Bryan',
    email: 'cbryan@reapit.com',
    developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
    clientId: 'DXX',
    adminId: '1',
    userCode: 'LJW',
  },
}

jest.mock('@reapit/cognito-auth', () => ({
  removeSession: jest.fn(),
  getSession: jest.fn(() => session),
  redirectToLogout: jest.fn(),
  getTokenFromQueryString: jest.fn(() => refreshParams),
  getSessionCookie: jest.fn(() => session),
}))

describe('use-auth (pure)', () => {
  describe('getLoginSession', () => {
    it('should return the current loginSession', () => {
      const { result } = renderHook<{}, AuthHook>(() => useAuth())
      expect(result.current.loginSession).toEqual(null)
    })
    it('should return the current loginSession', async () => {
      const { result } = renderHook<{}, AuthHook>(() => useAuth())
      await act(async () => {
        await result.current.getLoginSession(refreshParams)
      })
      expect(result.current.loginSession).toEqual(session)
    })
  })
  describe('logout', () => {
    it('should remove session', async () => {
      const { result } = renderHook<{}, AuthHook>(() => useAuth())
      await act(async () => {
        await result.current.logout()
      })
      expect(result.current.loginSession).toEqual(null)
    })
  })
  describe('useAuth Hook', () => {
    let setupComponent
    let hook
    beforeEach(() => {
      setupComponent = mountReactHook(useAuth) // Mount a Component with our hook
      hook = setupComponent.componentHook
    })
    it('should have login Session', async done => {
      await act(async () => {
        await hook.getLoginSession(refreshParams)
      })
      setTimeout(() => {
        expect(hook.loginSession).toEqual(session)
        done()
      }, 1000)
    })

    it('should match snapshot', async done => {
      await act(async () => {
        await hook.getLoginSession(refreshParams)
      })
      setTimeout(() => {
        expect(setupComponent).toMatchSnapshot()
        done()
      }, 1000)
    })
  })
})
