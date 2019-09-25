import { RefreshParams, LoginSession } from '@reapit/elements'

export const mockLoginSession: LoginSession = {
  userName: 'bob@acme.com',
  accessTokenExpiry: 2,
  loginType: 'CLIENT',
  refreshToken: 'MOCK_REFRESH_TOKEN',
  accessToken: 'MOCK_ACCESS_TOKEN',
  idToken: 'MOCK_ID_TOKEN',
  idTokenExpiry: 2,
  mode: 'WEB',
  loginIdentity: {
    email: 'bob@acme.com',
    developerId: 'SOME_DEV_ID',
    clientId: 'SOME_CLIENT_ID',
    adminId: 'SOME_ADMIN_ID',
    name: 'SOME_NAME',
    userCode: 'SOME_USER_CODE'
  }
}

export const mockRefreshParams: RefreshParams = {
  userName: 'bob@acme.com',
  loginType: 'CLIENT',
  refreshToken: 'MOCK_REFRESH_TOKEN',
  mode: 'WEB'
}

export default {
  dispatch: jest.fn(),
  state: {
    auth: {
      loginSession: mockLoginSession,
      refreshSesion: mockRefreshParams
    }
  }
}
