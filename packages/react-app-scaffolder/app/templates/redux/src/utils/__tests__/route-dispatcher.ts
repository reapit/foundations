import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { authenticatedRequestData } from '../../actions/authenticated'

jest.mock('../../core/store')
jest.mock('../../sagas/home')

describe('routeDispatcher', () => {
  it('should dispatch to authenticatedRequestData for the home route', async () => {
    await routeDispatcher(Routes.HOME as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(authenticatedRequestData())
  })
})