import * as React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { useAuthContext, AuthProvider } from '../auth-context'
import { RefreshParams, removeSession, redirectToLogout } from '@reapit/cognito-auth'

jest.mock('@reapit/cognito-auth', () => ({
  removeSession: jest.fn(),
  getSession: jest.fn(),
  redirectToLogout: jest.fn(),
}))

const refreshParams: RefreshParams = {
  cognitoClientId: '1',
  loginType: 'CLIENT',
  mode: 'WEB',
  redirectUri: '1',
  authorizationCode: '1',
  refreshToken: '1',
  userName: '1',
  state: null,
}

describe('auth-context', () => {
  it('getLoginSession should run correctly', async () => {
    const wrapper: React.FC = ({ children }) => <AuthProvider>{children}</AuthProvider>
    const { result, waitForNextUpdate } = renderHook(() => useAuthContext(), { wrapper })

    act(() => {
      result.current.getLoginSession(refreshParams)
    })

    expect(result.current.fetching).toBe(true)

    await waitForNextUpdate()

    expect(result.current.fetching).toBe(false)
    expect(result.current.loginSession).toBe(undefined)
  })

  it('logout should run correctly', async () => {
    const wrapper: React.FC = ({ children }) => <AuthProvider>{children}</AuthProvider>
    const { result } = renderHook(() => useAuthContext(), { wrapper })

    act(() => {
      result.current.logout()
    })

    expect(removeSession).toHaveBeenCalled()
    expect(redirectToLogout).toHaveBeenCalled()
  })
})
