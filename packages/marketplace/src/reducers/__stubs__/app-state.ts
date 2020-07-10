import { ReduxState } from '@/types/core'
import { COGNITO_GROUP_DEVELOPER_EDITION } from '@/constants/api'

const appState: ReduxState = {
  client: {
    appSummary: {
      isAppSummaryLoading: false,
      data: null,
      error: null,
    },
    appDetail: {
      error: null,
      data: null,
      isAppDetailLoading: false,
    },
    webComponent: {
      isShowModal: false,
      data: null,
      updating: false,
      loading: false,
      negotiators: null,
    },
  },
  installedApps: {
    loading: false,
    installedAppsData: null,
  },
  myApps: {
    loading: false,
    myAppsData: null,
  },
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
    authentication: {
      loading: false,
      code: '',
    },
    isStale: true,
  },
  error: {
    componentError: null,
    serverError: null,
  },

  appCategories: {
    data: [],
    pageNumber: 1,
    pageSize: 12,
    pageCount: 1,
    totalCount: 0,
  },

  installations: {
    formState: 'PENDING',
    loading: false,
    loadingFilter: false,
    installationsAppData: null,
    installationsFilteredAppData: null,
  },

  noticationMessage: {
    visible: false,
    variant: '',
    message: '',
  },

  desktopIntegrationTypes: {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    pageCount: 0,
    totalCount: 0,
  },
}

export default appState
