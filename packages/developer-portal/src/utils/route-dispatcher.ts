import { RouteValue } from '../types/core'
import Routes from '../constants/routes'
import store from '../core/store'
import { requestDeveloperData } from '@/actions/settings'
import { fetchOrganisationMembers } from '@/actions/developers'
import { getDeveloperId } from './session'
import { fetchCurrentMember } from '@/actions/current-member'

const routeDispatcher = async (route: RouteValue) => {
  switch (route) {
    case Routes.SETTINGS_PROFILE_TAB: {
      const developerId = await getDeveloperId()
      store.dispatch(fetchOrganisationMembers({ id: developerId }))
      store.dispatch(requestDeveloperData())
      store.dispatch(fetchCurrentMember())
      break
    }
    case Routes.SETTINGS_ORGANISATION_TAB: {
      const developerId = await getDeveloperId()
      store.dispatch(requestDeveloperData())
      store.dispatch(fetchCurrentMember())
      store.dispatch(fetchOrganisationMembers({ id: developerId }))
      break
    }
    case Routes.SETTINGS_BILLING_TAB: {
      store.dispatch(fetchCurrentMember())
      store.dispatch(requestDeveloperData())
      break
    }
    case Routes.DESKTOP:
      store.dispatch(requestDeveloperData())
      store.dispatch(fetchCurrentMember())
      break
    case Routes.HELP:
      // Need the fetcher to have retrieved the login session only.
      break
    default:
      console.error('Route not found, nothing to fetch')
  }
}

export default routeDispatcher
