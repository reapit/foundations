import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { GET_ALL_PAGE_SIZE } from '../../constants/paginator'
import { RouteValue } from '../../types/core'
import { developerRequestData, fetchMyIdentity } from '@/actions/developer'
import { requestDeveloperData } from '@/actions/settings'

jest.mock('@reapit/elements')
jest.mock('@/utils/session')
jest.mock('../../core/store')
jest.mock('../../sagas/client')
jest.mock('../../sagas/developer')

describe('routeDispatcher', () => {
  it('should dispatch to developerRequestData for the developer route', async () => {
    await routeDispatcher(Routes.APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(developerRequestData({ page: 1 }))
  })

  it('should dispatch to requestDeveloperData for the admin approvals paginate route', async () => {
    await routeDispatcher(Routes.SETTINGS as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(requestDeveloperData())
  })

  it('should dispatch to appInstallationsRequestData & developerRequestData for the analytics route', async () => {
    await routeDispatcher(Routes.ANALYTICS_TAB as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(developerRequestData({ appsPerPage: GET_ALL_PAGE_SIZE, page: 1 }))
    expect(store.dispatch).toHaveBeenCalledWith(fetchMyIdentity())
  })
})
