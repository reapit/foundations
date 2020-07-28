import { ReapitConnectSession } from '@reapit/connect-session'
import { selectIsAdmin, selectLoginIdentity } from '../auth'

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
