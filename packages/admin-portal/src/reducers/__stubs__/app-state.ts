import { ReduxState } from '@/types/core'
import { defaultState as defaultAppsState } from '@/reducers/apps'
import { defaultState as defaultDevelopersState } from '@/reducers/developers'
import { defaultState as defaultSubscriptionsState } from '@/reducers/subscriptions'

const appState: ReduxState = {
  developers: defaultDevelopersState,
  apps: defaultAppsState,
  subscriptions: defaultSubscriptionsState,
}

export default appState
