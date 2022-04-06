import routeDispatcher from '../route-dispatcher'
import store from '@/core/store'
import Routes from '@/constants/routes'
import { RouteValue } from '@/types/core'
import { requestDeveloperData } from '@/actions/settings'
import { fetchCurrentMember } from '@/actions/current-member'

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

  it('should dispatch correctly for the setting profile route', async () => {
    await routeDispatcher(Routes.SETTINGS_PROFILE_TAB as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(requestDeveloperData())
    expect(store.dispatch).toHaveBeenCalledWith(fetchCurrentMember())
  })
  it('should dispatch correctly for th setting billing route', async () => {
    await routeDispatcher(Routes.SETTINGS_BILLING_TAB as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(requestDeveloperData())
  })
})
