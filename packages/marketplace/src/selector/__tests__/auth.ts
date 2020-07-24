import {
  selectLoginType,
  selectIsAdmin,
  selectLoginIdentity,
  selectLoginSession,
  selectRefreshSession,
  selectIsTermAccepted,
  selectIsDesktopMode,
} from '../auth'
import appState from '@/reducers/__stubs__/app-state'
import { ReduxState } from '@/types/core'

describe('selectLoginType', () => {
  it('should run correctly', () => {
    const result = selectLoginType(appState)
    expect(result).toEqual(appState.auth.loginType)
  })
})

describe('selectIsAdmin', () => {
  it('should run correctly', () => {
    const result = selectIsAdmin(appState)
    expect(result).toEqual(appState.auth?.loginSession?.loginIdentity.isAdmin || false)
  })
})

describe('selectLoginIdentity', () => {
  it('should run correctly', () => {
    const result = selectLoginIdentity(appState)
    expect(result).toEqual(appState.auth.loginSession?.loginIdentity)
  })
})

describe('selectLoginSession', () => {
  it('should run correctly', () => {
    const result = selectLoginSession(appState)
    expect(result).toEqual(appState.auth.loginSession)
  })
})

describe('selectRefreshSession', () => {
  it('should run correctly', () => {
    const result = selectRefreshSession(appState)
    expect(result).toEqual(appState.auth.refreshSession)
  })
})

describe('selectIsTermAccepted', () => {
  it('should run correctly', () => {
    const result = selectIsTermAccepted(appState)
    expect(result).toEqual(appState.auth.isTermAccepted)
  })
})

describe('selectIsDesktopMode', () => {
  it('should run return false', () => {
    const result = selectIsDesktopMode(appState)
    expect(result).toBeFalsy
  })
  it('should run return true', () => {
    const mockDesktopModeAppState = {
      ...appState,
      auth: {
        refreshSession: {
          ...appState.auth.refreshSession,
          mode: 'DESKTOP',
        },
      },
    } as ReduxState
    const result = selectIsDesktopMode(mockDesktopModeAppState)
    expect(result).toBeFalsy
  })
})
