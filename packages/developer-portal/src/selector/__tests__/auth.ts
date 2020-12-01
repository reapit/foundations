import { ReapitConnectSession } from '@reapit/connect-session'
import {
  COGNITO_GROUP_ADMIN_USERS,
  COGNITO_GROUP_USERS,
  selectClientId,
  selectDeveloperId,
  selectIsAdmin,
  selectIsUserOrUserAdmin,
  selectLoggedUserEmail,
  selectLoginIdentity,
} from '../auth'
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

describe('selectIsUserOrUserAdmin', () => {
  it('should return true if user', () => {
    const authWithUser = {
      ...auth,
      loginIdentity: {
        ...auth.loginIdentity,
        groups: [COGNITO_GROUP_USERS],
      },
    }
    expect(selectIsUserOrUserAdmin(authWithUser)).toBe(true)
  })

  it('should return true if user admin', () => {
    const authWithUserAdmin = {
      ...auth,
      loginIdentity: {
        ...auth.loginIdentity,
        groups: [COGNITO_GROUP_ADMIN_USERS],
      },
    }
    expect(selectIsUserOrUserAdmin(authWithUserAdmin)).toBe(true)
  })

  it('should return false if not a user or a user admin', () => {
    const authWithoutUser = {
      ...auth,
      loginIdentity: {
        ...auth.loginIdentity,
        groups: [],
      },
    }
    expect(selectIsUserOrUserAdmin(authWithoutUser)).toBe(false)
  })
})
