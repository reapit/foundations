import React from 'react'
import { mount } from 'enzyme'
import appState from '@/reducers/__stubs__/app-state'
import { MemoryRouter } from 'react-router'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import routes from '@/constants/routes'
import ClientAppsManagement, { handleOnChange, handleOnSettingClick } from '../client-apps-management'
import Routes from '@/constants/routes'
import { ReduxState } from '@/types/core'
import { getMockRouterProps } from '@/utils/mock-helper'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

const createStore = (loading, isAdmin) => {
  return {
    ...appState,
    myApps: {
      ...appState.myApps,
      loading,
      myAppsData: {},
    },
    auth: {
      loginSession: {
        loginIdentity: {
          isAdmin,
          groups: [] as string[],
        },
      },
    },
  } as ReduxState
}

describe('MyApps', () => {
  const { history } = getMockRouterProps({})
  let mockStore
  let store
  beforeEach(() => {
    mockStore = configureStore()
  })

  it('should match a snapshot when LOADING false', () => {
    store = mockStore(createStore(false, true))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.MY_APPS, key: 'clientManageRoute' }]}>
            <ClientAppsManagement />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  it('should match a snapshot when LOADING true', () => {
    store = mockStore(createStore(true, true))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.MY_APPS, key: 'clientManageRoute' }]}>
            <ClientAppsManagement />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  it('should match a snapshot when isAdmin false', () => {
    store = mockStore(createStore(false, false))
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.MY_APPS, key: 'clientManageRoute' }]}>
            <ClientAppsManagement />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('handleOnChange', () => {
    const fn = handleOnChange(history)
    fn(1)
    expect(history.push).toBeCalledWith(`${routes.MY_APPS}?page=${1}`)
  })

  describe('handleOnSettingClick', () => {
    it('should run correctly', () => {
      const mockAppSummary: AppSummaryModel = {
        id: 'testId',
      }
      const fn = handleOnSettingClick(history)
      fn(mockAppSummary)
      expect(history.push).toBeCalledWith(`${Routes.CLIENT}/${mockAppSummary.id}/manage`)
    })
  })
})
