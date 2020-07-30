import { ReduxState } from '@/types/core'
import { defaultState as defaultAppDetailState } from '@/reducers/apps/detail'
import { defaultState as defaultAppListState } from '@/reducers/apps/list'
import { COGNITO_GROUP_DEVELOPER_EDITION } from '@/constants/api'
import { defaultState as defaultStaticsState } from '../apps/statistics'
import { defaultState as defaultApprovalsState } from '../apps/approvals'
import { defaultState as defaultRevisionState } from '../apps/revisions'
import { defaultState as defaultDeveloperListState } from '../developers/list'

const appState: ReduxState = {
  error: {
    componentError: null,
    serverError: null,
  },
  developers: {
    list: defaultDeveloperListState,
  },
  developerSetStatus: {
    formState: 'PENDING',
  },
  appDelete: {
    formState: 'PENDING',
  },
  noticationMessage: {
    visible: false,
    variant: '',
    message: '',
  },
  apps: {
    detail: defaultAppDetailState,
    list: defaultAppListState,
    approvals: defaultApprovalsState,
    revision: defaultRevisionState,
    statistics: defaultStaticsState,
  },
}

export default appState
