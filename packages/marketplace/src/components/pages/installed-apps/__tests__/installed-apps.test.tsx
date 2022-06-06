import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import routes from '@/constants/routes'
import { InstalledApps, handleOnChange, handleOnCardClick } from '../installed-apps'
import { handleLaunchApp } from '@/utils/launch-app'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'

jest.mock('@/utils/launch-app')

const createState = (loading) => {
  return {
    ...appState,
    installedApps: {
      loading: loading,
      installedAppsData: appsDataStub,
    },
  }
}

describe('InstalledApps', () => {
  it('should match a snapshot when LOADING false', () => {
    const mockStore = configureStore()
    const store = mockStore(createState(false))

    expect(
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.INSTALLED_APPS, key: 'installedAppsRoute' }]}>
            <InstalledApps />
          </MemoryRouter>
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    const mockStore = configureStore()
    const store = mockStore(createState(true))
    expect(
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.INSTALLED_APPS, key: 'installedAppsRoute' }]}>
            <InstalledApps />
          </MemoryRouter>
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('handleOnChange', () => {
    const mockHistory = {
      push: jest.fn(),
    }
    const fn = handleOnChange(mockHistory)
    fn(1)
    expect(mockHistory.push).toBeCalledWith(`${routes.INSTALLED_APPS}?page=${1}`)
  })

  it('handleOnCardClick should call handleLaunchApp', () => {
    handleOnCardClick(true)(appDetailDataStub.data)
    expect(handleLaunchApp).toHaveBeenCalledTimes(1)
    expect(handleLaunchApp).toHaveBeenCalledWith(appDetailDataStub.data, true)
  })
})
