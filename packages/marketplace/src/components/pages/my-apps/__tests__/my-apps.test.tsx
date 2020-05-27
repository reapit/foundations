import React from 'react'
import { mount } from 'enzyme'
import appState from '@/reducers/__stubs__/app-state'
import { MemoryRouter } from 'react-router'
import configureStore from 'redux-mock-store'
import * as ReactRedux from 'react-redux'
import routes from '@/constants/routes'
import MyApps, {
  handleOnChange,
  handleUseEffect,
  handleFetchMyApp,
  handleSetStateViewManage,
  handleFetchAppDetail,
  handleInstallationsSetFormState,
} from '../my-apps'
import Routes from '@/constants/routes'
import { ReduxState } from '@/types/core'
import { myAppsRequestData } from '@/actions/my-apps'
import { setAppDetailModalStateManage } from '@/actions/app-detail-modal'
import { appDetailRequestData } from '@/actions/app-detail'
import { appInstallationsSetFormState } from '@/actions/app-installations'

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
        },
      },
    },
  } as ReduxState
}

describe('MyApps', () => {
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
            <MyApps />
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
            <MyApps />
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
            <MyApps />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  it('handleOnChange', () => {
    const mockHistory = {
      push: jest.fn(),
    }
    const fn = handleOnChange(mockHistory)
    fn(1)
    expect(mockHistory.push).toBeCalledWith(`${routes.MY_APPS}/${1}`)
  })

  it('handleUseEffect', () => {
    const mockProps = {
      isDone: true,
      installationsSetFormState: jest.fn(),
      fetchMyApp: jest.fn(),
      pageNumber: 1,
    }
    const fn = handleUseEffect(mockProps)
    fn()
    expect(mockProps.installationsSetFormState).toBeCalled()
    expect(mockProps.fetchMyApp).toBeCalledWith(mockProps.pageNumber)
  })

  it('handleFetchMyApp', () => {
    const dispatch = jest.fn()
    const fn = handleFetchMyApp(dispatch, 1)
    fn()
    expect(dispatch).toBeCalledWith(myAppsRequestData(1))
  })
  it('handleSetStateViewManage', () => {
    const dispatch = jest.fn()
    const fn = handleSetStateViewManage(dispatch)
    fn()
    expect(dispatch).toBeCalledWith(setAppDetailModalStateManage())
  })
  it('handleFetchAppDetail', () => {
    const dispatch = jest.fn()
    const id = '1'
    const clientId = '2'
    const fn = handleFetchAppDetail(dispatch)
    fn(id, clientId)
    expect(dispatch).toBeCalledWith(appDetailRequestData({ id, clientId }))
  })
  it('handleInstallationsSetFormState', () => {
    const dispatch = jest.fn()
    const fn = handleInstallationsSetFormState(dispatch)
    fn('DONE')
    expect(dispatch).toBeCalledWith(appInstallationsSetFormState('DONE'))
  })
})
