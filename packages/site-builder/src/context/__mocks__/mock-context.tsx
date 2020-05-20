import { AuthHook } from '@/hooks/use-auth'

export const mockContext = {
  loginSession: {
    mode: 'WEB',
    userName: 'mockUsername',
    accessToken: 'mockToken',
    accessTokenExpiry: 123,
    idToken: 'mockIdToken',
    idTokenExpiry: 123,
    loginIdentity: {
      clientId: 'mockClientId',
      email: 'mockEmail',
      name: 'mockName',
      developerId: 'mockID',
      adminId: 'mockAdminID',
      userCode: 'mockUserCode',
      userTel: '0799999999',
    },
    loginType: 'CLIENT',
    cognitoClientId: '123',
    refreshToken: 'mockRefreshToken',
  },
  isFetchSession: false,
  logout: jest.fn(),
  getLoginSession: jest.fn(),
  refreshParams: null,
} as AuthHook
