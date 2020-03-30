import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { GET_ALL_PAGE_SIZE } from '../../constants/paginator'
import { RouteValue } from '../../types/core'
import { clientRequestData } from '../../actions/client'
import { developerRequestData } from '../../actions/developer'
import { myAppsRequestData } from '../../actions/my-apps'
import { installedAppsRequestData } from '../../actions/installed-apps'
import { adminApprovalsRequestData } from '../../actions/admin-approvals'
import { getAccessToken } from '../../utils/session'
import { requestDeveloperData } from '@/actions/settings'
import { getParamsFromPath } from '@/utils/client-url-params'
import { appInstallationsRequestData } from '@/actions/app-installations'

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
    expect(store.dispatch).toHaveBeenCalledWith(clientRequestData(getParamsFromPath('')))
  })

  it('should dispatch to installedAppsRequestData for the installed-apps route', async () => {
    await routeDispatcher(Routes.INSTALLED_APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(installedAppsRequestData(1))
  })

  it('should dispatch to installedAppsRequestData for the installed-apps paginate route', async () => {
    await routeDispatcher(Routes.INSTALLED_APPS_PAGINATE as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(installedAppsRequestData(2))
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
    expect(store.dispatch).toHaveBeenCalledWith(developerRequestData({ page: 1 }))
  })

  it('should dispatch to developerRequestData for the developer paginate route', async () => {
    await routeDispatcher(Routes.DEVELOPER_MY_APPS_PAGINATE as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(developerRequestData({ page: 2 }))
  })

  it('should dispatch to adminApprovalsRequestData for the admin approvals data route', async () => {
    await routeDispatcher(Routes.ADMIN_APPROVALS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(adminApprovalsRequestData(1))
  })

  it('should dispatch to adminApprovalsRequestData for the admin approvals paginate route', async () => {
    await routeDispatcher(Routes.ADMIN_APPROVALS_PAGINATE as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(adminApprovalsRequestData(2))
  })

  it('should dispatch to requestDeveloperData for the admin approvals paginate route', async () => {
    await routeDispatcher(Routes.SETTINGS as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(requestDeveloperData())
  })

  it('should dispatch to appInstallationsRequestData & developerRequestData for the analytics route', async () => {
    await routeDispatcher(Routes.DEVELOPER_ANALYTICS_TAB as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(appInstallationsRequestData({ pageSize: GET_ALL_PAGE_SIZE }))
    expect(store.dispatch).toHaveBeenCalledWith(developerRequestData({ appsPerPage: GET_ALL_PAGE_SIZE, page: 1 }))
  })
})
