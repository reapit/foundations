import { ReduxState } from '@/types/core'

const appState: ReduxState = {
  error: {
    componentError: null,
    serverError: null,
  },

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
    list: {
      data: [],
      pageSize: 0,
      pageCount: 0,
      totalCount: 0,
      isLoading: false,
      errorMessage: '',
    },
  },
}

export default appState
