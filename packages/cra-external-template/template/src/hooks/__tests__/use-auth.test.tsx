import { renderHook, act } from '@testing-library/react-hooks'
import { useAuth, AuthHook } from '../use-auth'
import mountReactHook from '../__mocks__/mount-react-hook'
import { session } from '../__mocks__/session'

import { refreshParams } from '../__mocks__/refresh-params'
jest.mock('@reapit/cognito-auth', () => ({
  removeSession: jest.fn(),
  getSession: jest.fn(() => require('../__mocks__/session').session),
  redirectToLogout: jest.fn(),
  getTokenFromQueryString: jest.fn(() => require('../__mocks__/refresh-params').refreshParams),
  getSessionCookie: jest.fn(() => require('../__mocks__/session').session),
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
