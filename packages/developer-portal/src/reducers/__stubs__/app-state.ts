import { ReduxState } from '@/types/core'
import { COGNITO_GROUP_DEVELOPER_EDITION } from '@/constants/api'

const appState: ReduxState = {
  developer: {
    loading: false,
    developerAppDetail: {
      error: null,
      data: null,
      isAppDetailLoading: false,
    },
    developerData: null,
    formState: 'PENDING',
    isVisible: false,
    myIdentity: null,
    billing: null,
    isServiceChartLoading: true,
    error: null,
    isMonthlyBillingLoading: true,
    monthlyBilling: null,
    webhookPingTestStatus: null,
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
  submitApp: {
    loading: false,
    formState: 'PENDING',
    submitAppData: null,
  },
  submitRevision: {
    formState: 'PENDING',
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
  revisions: {
    loading: false,
    revisions: null,
  },
  appDetailModal: 'VIEW_DETAIL_BROWSE',
  appDelete: {
    formState: 'PENDING',
  },
  appCategories: {
    data: [],
    pageNumber: 1,
    pageSize: 12,
    pageCount: 1,
    totalCount: 0,
  },
  settings: {
    loading: true,
    developerInfomation: null,
  },
  installations: {
    formState: 'PENDING',
    loading: false,
    loadingFilter: false,
    installationsAppData: null,
    installationsFilteredAppData: null,
  },
  appUsageStats: {
    loading: false,
    appUsageStatsData: null,
  },
  noticationMessage: {
    visible: false,
    variant: '',
    message: '',
  },
  appHttpTraffic: {
    perDayLoading: false,
    trafficEvents: null,
  },
  desktopIntegrationTypes: {
    data: [],
    pageNumber: 0,
    pageSize: 0,
    pageCount: 0,
    totalCount: 0,
  },
  webhookEdit: {
    loading: false,
    modalType: '',
    subcriptionCustomers: {
      data: [],
      pageNumber: 0,
      pageSize: 0,
      pageCount: 0,
      totalCount: 0,
    },
    subcriptionTopics: {
      _embedded: [],
      pageNumber: 0,
      pageSize: 0,
      pageCount: 0,
      totalCount: 0,
    },
    webhookData: {
      id: '',
      applicationId: '',
      url: '',
      description: '',
      topicIds: [],
      customerIds: [],
      active: false,
    },
  },
  webhooks: {
    subscriptions: {
      loading: false,
      error: false,
      subscriptions: {
        _embedded: [],
      },
    },
    topics: {
      applicationId: '',
      loading: false,
      error: false,
      topics: {
        _embedded: [],
      },
    },
  },
  developerSubscriptions: {
    create: {
      loading: false,
      error: false,
    },
    list: {
      loading: false,
      data: {
        data: [],
      },
    },
  },
}

export default appState
