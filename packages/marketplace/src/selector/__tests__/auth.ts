import { ReduxState } from '@/types/core'
import { selectLoginType, selectIsAdmin, selectLoginIdentity, selectLoginSession, selectClientId } from '../auth'

const mockState = {
  auth: {
    loginType: 'CLIENT',
    loginSession: {
      loginIdentity: {
        isAdmin: true,
        clientId: 'DCX',
      },
    },
  },
} as ReduxState

describe('selectLoginType', () => {
  it('should run correctly', () => {
    const result = selectLoginType(mockState)
    expect(result).toEqual(mockState.auth.loginType)
  })
})

describe('selectIsAdmin', () => {
  it('should run correctly', () => {
    const result = selectIsAdmin(mockState)
    expect(result).toEqual(mockState.auth?.loginSession?.loginIdentity.isAdmin)
  })
})

describe('selectLoginIdentity', () => {
  it('should run correctly', () => {
    const result = selectLoginIdentity(mockState)
    expect(result).toEqual(mockState.auth.loginSession?.loginIdentity)
  })
})

describe('selectLoginSession', () => {
  it('should run correctly', () => {
    const result = selectLoginSession(mockState)
    expect(result).toEqual(mockState.auth.loginSession)
  })
})

describe('selectClientId', () => {
  it('should run correctly', () => {
    const result = selectClientId(mockState)
    expect(result).toEqual(mockState.auth.loginSession?.loginIdentity?.clientId)
  })
})
