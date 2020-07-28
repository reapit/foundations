import { ReduxState } from '@/types/core'

const appState: ReduxState = {
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
  apps: {
    detail: { isLoading: false, data: null, errorMessage: '' },
  },
}

export default appState
