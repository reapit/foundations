import routeDispatcher from '../route-dispatcher'
import Store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { homeRequestData } from '../../actions/home'
import { itemRequestData } from '../../actions/item'

jest.mock('../../utils/fetcher')
jest.mock('../../core/store')
jest.mock('../../sagas/home')
jest.mock('../../sagas/item')

describe('routeDispatcher', () => {
  it('should dispatch to homeDataFetch for the home route', () => {
    routeDispatcher(Routes.HOME as RouteValue)
    expect(Store.dispatch).toHaveBeenCalledWith(homeRequestData())
  })

  it('should dispatch to itemDataFetch for the item route', () => {
    routeDispatcher(Routes.ITEM as RouteValue)
    expect(Store.dispatch).toHaveBeenCalledWith(itemRequestData())
  })
})
