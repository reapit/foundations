import routeDispatcher from '../route-dispatcher'
import store from '@/core/store'
import Routes from '@/constants/routes'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import { RouteValue } from '@/types/core'
import { fetchMyIdentity } from '@/actions/developer'
import { requestDeveloperData } from '@/actions/settings'
import { fetchAppList } from '@/actions/apps'
import { fetchCurrentMember } from '@/actions/current-member'
import { fetchAppDetail } from '@/actions/apps'
import { fetchCategoryList } from '@/actions/categories'
import { fetchDesktopIntegrationTypeList } from '@/actions/desktop-integration-types'

jest.mock('@reapit/elements')
jest.mock('../../core/store')
jest.mock('../../sagas/developer')
jest.mock('@/core/store', () => ({
  dispatch: jest.fn(),
}))
jest.mock('@/utils/session', () => ({
  getClientId: jest.fn().mockResolvedValue('clientId'),
  getDeveloperId: jest.fn().mockResolvedValue('getDeveloperId'),
}))

describe('routeDispatcher', () => {
  afterAll(() => {
    jest.resetAllMocks()
  })

  test('should dispatch to developerRequestData for the developer route', async () => {
    await routeDispatcher(Routes.APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(fetchAppList({ page: 1 }))
  })

  it('should dispatch correctly for the setting profile route', async () => {
    await routeDispatcher(Routes.SETTINGS_PROFILE_TAB as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(requestDeveloperData())
    expect(store.dispatch).toHaveBeenCalledWith(fetchCurrentMember())
  })
  it('should dispatch correctly for th setting billing route', async () => {
    await routeDispatcher(Routes.SETTINGS_BILLING_TAB as RouteValue, { page: '2' })
    expect(store.dispatch).toHaveBeenCalledWith(requestDeveloperData())
  })
  it('should dispatch to appInstallationsRequestData & developerRequestData for the analytics route', async () => {
    await routeDispatcher(Routes.ANALYTICS_TAB as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(fetchAppList({ appsPerPage: GET_ALL_PAGE_SIZE, page: 1 }))
    expect(store.dispatch).toHaveBeenCalledWith(fetchMyIdentity())
  })
  it('should dispatch to required actions for the app edit route', async () => {
    const mockId = '1'
    await routeDispatcher(Routes.APPS_EDIT as RouteValue, { appid: mockId })

    expect(store.dispatch).toHaveBeenCalledWith(fetchAppDetail({ id: mockId }))
    expect(store.dispatch).toHaveBeenCalledWith(fetchCategoryList())
    expect(store.dispatch).toHaveBeenCalledWith(fetchDesktopIntegrationTypeList())
    expect(store.dispatch).toHaveBeenCalledWith(requestDeveloperData())
    expect(store.dispatch).toHaveBeenCalledWith(fetchCurrentMember())
  })
})
