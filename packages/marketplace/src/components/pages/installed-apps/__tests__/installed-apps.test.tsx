import * as React from 'react'
import { mount } from 'enzyme'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import routes from '@/constants/routes'
import { InstalledApps, handleOnChange, handleOnCardClick } from '../installed-apps'
import { handleLaunchApp } from '../../../../utils/launch-app'
import { ReduxState } from '@/types/core'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'

jest.mock('../../../../utils/launch-app')

describe('InstalledApps', () => {
  it('should match a snapshot when LOADING false', () => {
    const mockState = {
      installedApps: {
        loading: false,
        installedAppsData: appsDataStub,
      },
      error: {
        componentError: {},
      },
    } as ReduxState

    const mockStore = configureStore()
    const store = mockStore(mockState)

    expect(
      mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.INSTALLED_APPS, key: 'installedAppsRoute' }]}>
            <InstalledApps />
          </MemoryRouter>
        </Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    const mockState = {
      installedApps: {
        loading: true,
        installedAppsData: appsDataStub,
      },
    } as ReduxState

    const mockStore = configureStore()
    const store = mockStore(mockState)
    expect(
      mount(
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
    expect(mockHistory.push).toBeCalledWith(`${routes.INSTALLED_APPS}/${1}`)
  })

  it('handleOnCardClick should call handleLaunchApp', () => {
    handleOnCardClick(appDetailDataStub.data)
    expect(handleLaunchApp).toHaveBeenCalledTimes(1)
    expect(handleLaunchApp).toHaveBeenCalledWith(appDetailDataStub.data)
  })
})
