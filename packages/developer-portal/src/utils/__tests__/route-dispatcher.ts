import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { GET_ALL_PAGE_SIZE } from '../../constants/paginator'
import { RouteValue } from '../../types/core'
import { developerRequestData } from '@/actions/developer'
import { requestDeveloperData } from '@/actions/settings'

jest.mock('@reapit/elements')
jest.mock('@/utils/session')
jest.mock('../../core/store')
jest.mock('../../sagas/developer')

describe('routeDispatcher', () => {
  test('should dispatch to developerRequestData for the developer route', async () => {
    await routeDispatcher(Routes.APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(developerRequestData({ page: 1 }))
  })

  it('should dispatch to requestDeveloperData for the admin approvals paginate route', async () => {
    await routeDispatcher(Routes.SETTINGS as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(requestDeveloperData())
  })
  it('should dispatch to requestDeveloperData for the admin approvals paginate route', async () => {
    await routeDispatcher(Routes.SETTINGS_BILLING_TAB as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(requestDeveloperData())
  })
  it('should dispatch to requestDeveloperData for the admin approvals paginate route', async () => {
    await routeDispatcher(Routes.WEBHOOKS as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(developerRequestData({ page: 1, appsPerPage: GET_ALL_PAGE_SIZE }))
  })
})
