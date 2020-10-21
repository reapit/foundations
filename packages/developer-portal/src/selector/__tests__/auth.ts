import { ReapitConnectSession } from '@reapit/connect-session'
import { selectClientId, selectDeveloperId, selectIsAdmin, selectLoggedUserEmail, selectLoginIdentity } from '../auth'
import { auth } from '../__mocks__/auth'

const connectSession = {
  loginIdentity: {
    adminId: 'adminId',
  },
} as ReapitConnectSession

describe('selectIsAdmin', () => {
  it('should run correctly', () => {
    expect(selectIsAdmin(connectSession)).toEqual(true)
  })
})

describe('selectLoginIdentity', () => {
  it('should run correctly', () => {
    expect(selectLoginIdentity(connectSession)).toEqual(connectSession.loginIdentity)
  })
})

describe('selectClientId', () => {
  it('should run correctly', () => {
    expect(selectClientId(auth)).toEqual(auth.loginIdentity.clientId)
  })
})

describe('selectDeveloperId', () => {
  it('should run correctly', () => {
    expect(selectDeveloperId(auth)).toEqual(auth.loginIdentity.developerId)
  })
})

describe('selectLoggedUserEmail', () => {
  it('should run correctly', () => {
    expect(selectLoggedUserEmail(auth)).toEqual(auth.loginIdentity.email)
  })
})
