import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { homeRequestData } from '../../actions/home'

jest.mock('../../core/store')

describe('routeDispatcher', () => {
  it('should dispatch to homeRequestData for the home route', async () => {
    await routeDispatcher(Routes.HOME as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(homeRequestData())
  })

  it('should dispatch to homeRequestData for the home route', async () => {
    await routeDispatcher(Routes.PROFILE_ID as RouteValue)
    expect(store.dispatch).toHaveBeenCalled()
  })
})
