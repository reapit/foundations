import routeDispatcher from '../route-dispatcher'
import store from '@/core/store'

import Routes from '@/constants/routes'
import { RouteValue } from '@/types/core'
import { clientFetchAppSummary } from '@/actions/apps'
import { myAppsRequestData } from '@/actions/apps'
import { installedAppsRequestData } from '@/actions/apps'

jest.mock('@reapit/elements')

jest.mock('@/core/store', () => ({
  dispatch: jest.fn(),
}))

jest.mock('@/sagas/apps')

describe('routeDispatcher', () => {
  it('should dispatch to clientFetchAppSummaryclientFetchAppSummary for the client route', async () => {
    await routeDispatcher(Routes.APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(clientFetchAppSummary({ page: 1, preview: false }))
  })

  it('should dispatch to installedAppsRequestData for the installed-apps route', async () => {
    await routeDispatcher(Routes.INSTALLED_APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(installedAppsRequestData(1))
  })

  it('should dispatch to myAppsRequestData for the my-apps route', async () => {
    await routeDispatcher(Routes.MY_APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(myAppsRequestData(1))
  })
})
