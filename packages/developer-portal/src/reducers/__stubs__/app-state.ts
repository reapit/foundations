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
    developerInfomation: {
      id: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
      created: '2019-11-19T11:44:16',
      modified: '2020-07-13T08:50:48',
      externalId: '259b23bd-fc44-4493-ad57-f019bb57a315',
      name: 'Craig Lorem Ok',
      company: 'REAPIT Ltd.2123znww',
      jobTitle: 'Head of Platform2z1',
      email: 'cbryan@reapit.com',
      telephone: '08261826162',
      isInactive: false,
      about: '',
      website: 'https://google.com',
      taxNumber: '',
      registrationNumber: '12341',
      billingEmail: '',
      billingTelephone: '',
      billingKeyContact: '',
      reapitReference: 'aaa111',
      noTaxRegistration: false,
      nationalInsurance: '010212',
      status: 'incomplete',
      companyAddress: {
        buildingName: 'tes',
        buildingNumber: '1212',
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        postcode: '1212',
        countryId: 'AF',
      },
    },
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
  developers: {
    members: {
      loading: false,
      data: {
        data: [],
      },
    },
  },
}

export default appState
