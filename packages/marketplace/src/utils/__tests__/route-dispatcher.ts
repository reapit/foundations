import routeDispatcher from '../route-dispatcher'
import store from '@/core/store'

import Routes from '@/constants/routes'
import { RouteValue } from '@/types/core'
import { fetchApps } from '@/actions/apps'
import { fetchDesktopIntegrationTypes } from '@/actions/desktop-integration-types'
import { APPS_PER_PAGE } from '@/constants/paginator'

jest.mock('@reapit/elements')

jest.mock('@/core/store', () => ({
  dispatch: jest.fn(),
}))

jest.mock('@/sagas/apps')

xdescribe('routeDispatcher', () => {
  it('should dispatch to clientFetchAppSummaryclientFetchAppSummary for the client route', async () => {
    await routeDispatcher(Routes.APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(fetchDesktopIntegrationTypes({}))
  })

  it('should dispatch to fetchApps for the my-apps route', async () => {
    await routeDispatcher(Routes.MY_APPS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchApps({ onlyInstalled: true, pageNumber: 1, pageSize: APPS_PER_PAGE }),
    )
  })
})
