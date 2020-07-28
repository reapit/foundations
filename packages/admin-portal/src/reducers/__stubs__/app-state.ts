import { ReduxState } from '@/types/core'
import { defaultState as defaultAppDetailState } from '@/reducers/apps/detail'
import { defaultState as defaultAppListState } from '@/reducers/apps/list'
import { COGNITO_GROUP_DEVELOPER_EDITION } from '@/constants/api'

const appState: ReduxState = {
  error: {
    componentError: null,
    serverError: null,
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
    detail: defaultAppDetailState,
    list: defaultAppListState,
  },
}

export default appState
