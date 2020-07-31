import { ReduxState } from '@/types/core'
import { defaultState as defaultAppsState } from '@/reducers/apps'
import { defaultState as defaultDevelopersState } from '@/reducers/developers'

const appState: ReduxState = {
  error: {
    componentError: null,
    serverError: null,
  },
  developers: defaultDevelopersState,
  noticationMessage: {
    visible: false,
    variant: '',
    message: '',
  },
  apps: defaultAppsState,
}

export default appState
