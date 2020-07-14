import { ReduxState } from '@/types/core'
import { COGNITO_GROUP_DEVELOPER_EDITION } from '@/constants/api'

const appState: ReduxState = {
  auth: {
    error: false,
    loginSession: {
      accessToken: 'testAccessToken',
      accessTokenExpiry: 1581238260,
      idToken: 'testIdToken',
      idTokenExpiry: 1234428260,
      refreshToken: 'testRefreshToken',
      cognitoClientId: 'testCognitoClientId',
      loginType: 'CLIENT',
      userName: 'test@reapit.com',
      mode: 'WEB',
      loginIdentity: {
        name: 'Test User',
        email: 'test@reapit.com',
        developerId: null,
        clientId: 'testClientId',
        adminId: null,
        userCode: 'testUserCode',
        userTel: '123',
        groups: [COGNITO_GROUP_DEVELOPER_EDITION],
      },
    },
    isTermAccepted: false,
    loginType: 'CLIENT',
    refreshSession: {
      refreshToken: 'testRefreshToken',
      loginType: 'CLIENT',
      userName: 'test@reapit.com',
      mode: 'WEB',
      cognitoClientId: 'testCognitoClientId',
      authorizationCode: '',
      redirectUri: '',
      state: null,
    },
  },
  appDetail: {
    loading: false,
    error: false,
    appDetailData: null,
    isStale: true,
  },
  error: {
    componentError: null,
    serverError: null,
  },
  appsManagement: {
    loading: false,
    formState: 'PENDING',
    appsData: null,
  },
  approvals: {
    loading: false,
    approvalsData: null,
  },
  devsManagement: {
    loading: false,
  },
  developerSetStatus: {
    formState: 'PENDING',
  },
  revisionDetail: {
    loading: false,
    error: false,
    revisionDetailData: null,
    approveFormState: 'PENDING',
    declineFormState: 'PENDING',
  },
  appDelete: {
    formState: 'PENDING',
  },
  noticationMessage: {
    visible: false,
    variant: '',
    message: '',
  },
  statistics: {
    loading: false,
    result: {
      data: [],
      totalCount: 0,
    },
  },
}

export default appState
