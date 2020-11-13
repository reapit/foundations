import { ReduxState } from '@/types/core'
import { defaultState as defaultAppsState } from '@/reducers/apps'
import { defaultState as defaultDevelopersState } from '@/reducers/developers'
import { defaultState as defaultCustomersState } from '@/reducers/customers'
import { defaultState as defaultSubscriptionsState } from '@/reducers/subscriptions'

const appState: ReduxState = {
  developers: defaultDevelopersState,
  apps: defaultAppsState,
  customers: defaultCustomersState,
  subscriptions: defaultSubscriptionsState,
}

export default appState
