import { ReduxState } from '@/types/core'

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
      negotiators: {},
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
