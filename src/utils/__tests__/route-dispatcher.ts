import routeDispatcher from '../route-dispatcher'
import Store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { clientRequestData } from '../../actions/client'
import { developerRequestData } from '../../actions/developer'

jest.mock('../../utils/fetcher')
jest.mock('../../core/store')
jest.mock('../../sagas/client')
jest.mock('../../sagas/developer')

describe('routeDispatcher', () => {
  it('should dispatch to clientDataFetch for the client route', () => {
    routeDispatcher(Routes.CLIENT as RouteValue)
    expect(Store.dispatch).toHaveBeenCalledWith(clientRequestData())
  })

  it('should dispatch to developerDataFetch for the developer route', () => {
    routeDispatcher(Routes.DEVELOPER_MY_APPS as RouteValue)
    expect(Store.dispatch).toHaveBeenCalledWith(developerRequestData())
  })
})
