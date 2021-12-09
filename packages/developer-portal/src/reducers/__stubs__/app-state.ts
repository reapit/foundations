import { ReduxState } from '../../types/core'
import { mockWebhookLogs, subscriptions } from '../../sagas/__stubs__/webhooks'
import { WebhookCreateEditState } from '../webhooks-subscriptions/webhook-edit-modal'
import { webhookDataStub, webhookItemDataStub } from '../../sagas/__stubs__/webhook-edit'

export const appState: ReduxState = {
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
      notificationsEmail: 'wmcvay@reapit.com',
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
      ...subscriptions,
    },
    edit: {
      loading: false,
      modalType: '',
      webhookCreateEditState: WebhookCreateEditState.INITIAL,
      subcriptionCustomers: webhookDataStub.subcriptionCustomers,
      subcriptionTopics: webhookDataStub.subcriptionTopics,
      webhookData: webhookItemDataStub,
    },
  },
  webhooksTopics: {
    list: {
      isLoading: false,
      errorMessage: '',
      _embedded: [],
    },
  },
  webhookLogs: {
    list: {
      isLoading: false,
      errorMessage: '',
      logs: mockWebhookLogs,
    },
  },
  developerSubscriptions: {
    create: {
      isLoading: false,
      error: false,
    },
    list: {
      isLoading: false,
      data: {
        data: [],
      },
    },
  },
  developers: {
    members: {
      isLoading: false,
      data: [],
      inviteMember: {
        isLoading: false,
      },
      disableMember: {
        isLoading: false,
      },
      setAsAdmin: {
        isLoading: false,
      },
    },
    developerDetails: {
      isLoading: false,
      data: {},
    },
    memberDetails: {
      isLoading: false,
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
    install: {
      isLoading: false,
      errorMessage: '',
    },
    uninstall: {
      isLoading: false,
      errorMessage: '',
    },
  },
  currentMember: {
    isLoading: false,
    data: {
      id: '5d092fe0-daff-11ea-9712-0649ba4a135a',
      created: '2020-07-31T21:30:31',
      modified: '2020-08-12T09:15:20',
      email: 'cbryan@reapit.com',
      name: 'Craig Lorem',
      jobTitle: 'Head of Platform',
      status: 'active',
      role: 'admin',
      developerId: '909dcdc1-6657-4a37-a5cc-05acd79d6a47',
      agencyCloudAccess: true,
      useCustomerData: false,
      sandboxId: 'GBR',
    },
    update: {
      state: 'UNKNOWN',
      isLoading: false,
    },
  },
}

export default appState
