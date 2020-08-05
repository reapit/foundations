import { ReduxState } from '@/types/core'

const appState: ReduxState = {
  apps: {
    list: {
      data: [],
      isLoading: false,
    },
    detail: {
      data: {},
      isLoading: false,
    },
    authentication: {
      code: '',
      isLoading: false,
    },
    createApp: {
      isLoading: false,
    },
    deleteApp: {
      isLoading: false,
    },
    revisions: {
      detail: {
        data: {},
        isLoading: false,
      },
      list: {
        data: [],
        isLoading: false,
      },
      declineRevision: {
        isLoading: false,
      },
      createRevision: {
        isLoading: false,
      },
    },
  },
  scopes: {
    list: {
      data: [],
      isLoading: false,
    },
  },
  categories: {
    list: {
      data: [],
      isLoading: false,
    },
  },
  developer: {
    loading: false,
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
  error: {
    componentError: null,
    serverError: null,
  },
  developerSetStatus: {
    formState: 'PENDING',
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
  appUsageStats: {
    loading: false,
    appUsageStatsData: null,
  },
  noticationMessage: {
    visible: false,
    variant: '',
    message: '',
  },
  trafficStatistics: {
    list: {
      isLoading: false,
      data: null,
    },
  },
  desktopIntegrationTypes: {
    list: {
      data: [],
      isLoading: false,
    },
  },
  webhooksSubscriptions: {
    list: {
      isLoading: false,
      errorMessage: '',
      _embedded: [],
      pageNumber: 0,
      pageSize: 0,
      pageCount: 0,
      totalCount: 0,
    },
    edit: {
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
  },
  webhooksTopics: {
    list: {
      isLoading: false,
      errorMessage: '',
      _embedded: [],
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
      pagedResult: {
        data: [],
      },
      inviteMember: {
        loading: false,
      },
    },
    developerDetails: {
      loading: false,
      data: {},
    },
    memberDetails: {
      loading: false,
      data: {},
      inviteStatus: 'PENDING',
    },
  },
  installations: {
    installationsList: {
      list: {},
      isLoading: false,
    },
    installationsFilterList: {
      list: {},
      isLoading: false,
    },
    formState: {
      state: 'PENDING',
    },
  },
}

export default appState
