import { ReduxState } from '@/types/core'

const appState: ReduxState = {
  categories: {
    list: {
      data: [],
      pageNumber: 1,
      pageSize: 12,
      pageCount: 1,
      totalCount: 0,
      isLoading: false,
      errorMessage: '',
    },
  },
  installations: {
    install: {
      isLoading: false,
      errorMessage: '',
    },
    uninstall: {
      isLoading: false,
      errorMessage: '',
    },
    list: {
      isLoading: false,
      list: {},
    },
  },
  negotiators: {
    list: {
      data: [],
      pageNumber: 1,
      pageSize: 12,
      pageCount: 1,
      totalCount: 0,
      isLoading: false,
      errorMessage: '',
    },
  },

  apps: {
    list: {
      data: [],
      pageNumber: 1,
      pageSize: 12,
      pageCount: 1,
      totalCount: 0,
      isLoading: false,
      errorMessage: '',
      developerApps: [],
    },
    detail: {
      data: {},
      isLoading: false,
      errorMessage: '',
    },
    featureList: {
      data: [],
      pageNumber: 1,
      pageSize: 12,
      pageCount: 1,
      totalCount: 0,
      isLoading: false,
      errorMessage: '',
    },
  },

  webComponent: {
    detail: {
      data: {
        appointmentLength: 1,
        appointmentTimeGap: 1,
        appointmentTypes: 'abc',
        customerId: 'mockCustomers',
        negotiatorIds: ['12', '34'],
        daysOfWeek: ['monday'],
      },
      isLoading: false,
      errorMessage: '',
    },
    update: {
      isLoading: false,
      errorMessage: '',
    },
  },

  desktopIntegrationTypes: {
    list: {
      data: [],
      pageSize: 0,
      pageCount: 0,
      totalCount: 0,
      isLoading: false,
      errorMessage: '',
    },
  },

  cognitoIdentity: {
    updatePassword: {
      loading: false,
      errorMessage: '',
    },
  },
}

export default appState
