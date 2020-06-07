import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { getMockRouterProps } from '@/utils/mock-helper'
import { MemoryRouter } from 'react-router'
import DeveloperAppDetail, {
  handleOnDeleteAppSuccess,
  closeInstallationsModal,
  closeAppRevisionComparisonModal,
  closeDeleteAppModal,
  onBackToAppsButtonClick,
} from '../developer-app-detail'
import routes from '@/constants/routes'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'

const mockState = {
  ...appState,
  auth: {
    loginType: 'DEVELOPER',
  },
} as ReduxState

describe('DeveloperAppDetail', () => {
  const { history } = getMockRouterProps({})
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.DEVELOPER_APP_DETAIL, key: 'developerAppDetailRoute' }]}>
            <DeveloperAppDetail />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleOnDeleteAppSuccess', () => {
    const history = {
      replace: jest.fn(),
    } as any
    const fn = handleOnDeleteAppSuccess(history)
    fn()
    expect(history.replace).toBeCalledWith(routes.DEVELOPER_MY_APPS)
  })
  describe('handleOnDeleteAppSuccess', () => {
    const mockFunction = jest.fn()
    const fn = closeInstallationsModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
  describe('closeAppRevisionComparisonModal', () => {
    const mockFunction = jest.fn()
    const fn = closeAppRevisionComparisonModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
  describe('closeDeleteAppModal', () => {
    const mockFunction = jest.fn()
    const fn = closeDeleteAppModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
  describe('onBackToAppsButtonClick', () => {
    it('should run correctly', () => {
      const fn = onBackToAppsButtonClick(history)
      fn()
      expect(history.push).toBeCalledWith(Routes.DEVELOPER_MY_APPS)
    })
  })
})
