import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { clientRequestData } from '../../actions/client'
import { developerRequestData } from '../../actions/developer'
import { myAppsRequestData } from '../../actions/my-apps'
import { adminApprovalsRequestData } from '../../actions/admin-approvals'
import { getAccessToken } from '../../utils/session'

jest.mock('@reapit/elements')
jest.mock('../../utils/session')
jest.mock('../../core/store')
jest.mock('../../sagas/client')
jest.mock('../../sagas/developer')

describe('routeDispatcher', () => {
  it('should await for an access token before fetching a route', async () => {
    await routeDispatcher(Routes.CLIENT as RouteValue)
    expect(getAccessToken).toHaveBeenCalledTimes(1)
  })

  it('should dispatch to clientRequestData for the client route', async () => {
    await routeDispatcher(Routes.CLIENT as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(clientRequestData(1))
  })

  it('should dispatch to clientRequestData for the client paginate route', async () => {
    await routeDispatcher(Routes.CLIENT_PAGINATE as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(clientRequestData(2))
  })

  it('should dispatch to myAppsRequestData for the my-apps route', async () => {
    await routeDispatcher(Routes.MY_APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(myAppsRequestData(1))
  })

  it('should dispatch to myAppsRequestData for the my-apps paginate route', async () => {
    await routeDispatcher(Routes.MY_APPS_PAGINATE as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(myAppsRequestData(2))
  })

  it('should dispatch to developerRequestData for the developer route', async () => {
    await routeDispatcher(Routes.DEVELOPER_MY_APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(developerRequestData(1))
  })

  it('should dispatch to developerRequestData for the developer paginate route', async () => {
    await routeDispatcher(Routes.DEVELOPER_MY_APPS_PAGINATE as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(developerRequestData(2))
  })

  it('should dispatch to adminApprovalsRequestData for the admin approvals data route', async () => {
    await routeDispatcher(Routes.ADMIN_APPROVALS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(adminApprovalsRequestData(1))
  })

  it('should dispatch to adminApprovalsRequestData for the admin approvals paginate route', async () => {
    await routeDispatcher(Routes.ADMIN_APPROVALS_PAGINATE as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(adminApprovalsRequestData(2))
  })
})
