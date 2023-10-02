import { ReapitConnectSession } from '@reapit/connect-session'
import { mockConnectSession } from '../../tests/__stubs__/connect-session'
import {
  COGNITO_GROUP_ADMIN_USERS,
  COGNITO_GROUP_ADMIN_USERS_LEGACY,
  COGNITO_GROUP_USERS,
  selectClientId,
  selectDeveloperId,
  selectIsAdmin,
  selectIsUserOrUserAdmin,
  selectLoggedUserEmail,
  selectLoginIdentity,
  selectIsDeveloperAdmin,
  COGNITO_GROUP_DEVELOPER_ADMIN,
} from '../auth'
import { selectIsCustomer } from '../auth'

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
    expect(selectClientId(mockConnectSession)).toEqual(mockConnectSession.loginIdentity.clientId)
  })
})

describe('selectDeveloperId', () => {
  it('should run correctly', () => {
    expect(selectDeveloperId(mockConnectSession)).toEqual(mockConnectSession.loginIdentity.developerId)
  })
})

describe('selectLoggedUserEmail', () => {
  it('should run correctly', () => {
    expect(selectLoggedUserEmail(mockConnectSession)).toEqual(mockConnectSession.loginIdentity.email)
  })
})

describe('selectIsUserOrUserAdmin', () => {
  it('should return true if user', () => {
    const authWithUser = {
      ...mockConnectSession,
      loginIdentity: {
        ...mockConnectSession.loginIdentity,
        groups: [COGNITO_GROUP_USERS],
      },
    }
    expect(selectIsUserOrUserAdmin(authWithUser)).toBe(true)
  })

  it('should return true if user admin', () => {
    const authWithUserAdmin = {
      ...mockConnectSession,
      loginIdentity: {
        ...mockConnectSession.loginIdentity,
        groups: [COGNITO_GROUP_ADMIN_USERS],
      },
    }
    expect(selectIsUserOrUserAdmin(authWithUserAdmin)).toBe(true)
  })

  it('should return true if user admin legacy', () => {
    const authWithUserAdmin = {
      ...mockConnectSession,
      loginIdentity: {
        ...mockConnectSession.loginIdentity,
        groups: [COGNITO_GROUP_ADMIN_USERS_LEGACY],
      },
    }
    expect(selectIsUserOrUserAdmin(authWithUserAdmin)).toBe(true)
  })

  it('should return false if not a user or a user admin', () => {
    const authWithoutUser = {
      ...mockConnectSession,
      loginIdentity: {
        ...mockConnectSession.loginIdentity,
        groups: [],
      },
    }
    expect(selectIsUserOrUserAdmin(authWithoutUser)).toBe(false)
  })
})

describe('selectIsCustomer', () => {
  it('should return true if user', () => {
    const authWithUser = {
      ...mockConnectSession,
      loginIdentity: {
        ...mockConnectSession.loginIdentity,
        groups: [COGNITO_GROUP_USERS],
      },
    }
    expect(selectIsCustomer(authWithUser)).toBe(true)
  })

  it('should return false if not a user', () => {
    const authWithoutUser = {
      ...mockConnectSession,
      loginIdentity: {
        ...mockConnectSession.loginIdentity,
        agencyCloudId: null,
      },
    }
    expect(selectIsCustomer(authWithoutUser)).toBe(false)
  })
})

describe('selectIsDeveloperAdmin', () => {
  it('should return false if user', () => {
    const authWithUser = {
      ...mockConnectSession,
      loginIdentity: {
        ...mockConnectSession.loginIdentity,
        groups: [],
      },
    }
    expect(selectIsDeveloperAdmin(authWithUser)).toBe(false)
  })

  it('should return true if an admin', () => {
    const authWithoutUser = {
      ...mockConnectSession,
      loginIdentity: {
        ...mockConnectSession.loginIdentity,
        groups: [COGNITO_GROUP_DEVELOPER_ADMIN],
      },
    }
    expect(selectIsDeveloperAdmin(authWithoutUser)).toBe(true)
  })
})
