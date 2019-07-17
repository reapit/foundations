import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { clientRequestData } from '../../actions/client'
import { developerRequestData } from '../../actions/developer'
import { myAppsRequestData } from '../../actions/my-apps'
import { adminRequestRevisions } from '../../actions/admin'

jest.mock('../../utils/fetcher')
jest.mock('../../core/store')
jest.mock('../../sagas/client')
jest.mock('../../sagas/developer')

describe('routeDispatcher', () => {
  it('should dispatch to clientDataFetch for the client route', () => {
    routeDispatcher(Routes.CLIENT as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(clientRequestData())
  })

  it('should dispatch to myAppsRequestData for the my-apps route', () => {
    routeDispatcher(Routes.MY_APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(myAppsRequestData())
  })

  it('should dispatch to developerDataFetch for the developer route', () => {
    routeDispatcher(Routes.DEVELOPER_MY_APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(developerRequestData())
  })

  it('should dispatch to adminRequestRevisions for the admin route', () => {
    routeDispatcher(Routes.ADMIN as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(adminRequestRevisions())
  })
})
