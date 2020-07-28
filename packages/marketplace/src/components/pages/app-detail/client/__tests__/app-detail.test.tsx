import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { getMockRouterProps } from '@/utils/mock-helper'
import AppDetail, {
  handleCloseInstallConfirmationModal,
  handleInstallAppButtonClick,
  handleCloseUnInstallConfirmationModal,
  handleUnInstallAppButtonClick,
  onBackToAppsButtonClick,
} from '../app-detail'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'

describe('AppDetail', () => {
  const { history } = getMockRouterProps({})
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore({
      ...appState,
      client: {
        appDetail: {
          data: {},
          loading: false,
        },
      },
    })
  })

  it('should render loader when isLoadingAppDetail = true', () => {
    const mockStore = configureStore()
    const customStore = mockStore({
      ...appState,
      client: {
        appDetail: {
          isAppDetailLoading: true,
          data: {},
        },
      },
    })

    const wrapper = mount(
      <ReactRedux.Provider store={customStore}>
        <MemoryRouter initialEntries={[{ pathname: Routes.APP_DETAIL, key: 'clientAppDetailRoute' }]}>
          <AppDetail />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )

    expect(wrapper).toMatchSnapshot()
    const loader = wrapper.find('[data-test="client-app-detail-loader"]')
    expect(loader.length).toBe(1)
  })

  it('should render loader when client.appDetail.data is an empty object', () => {
    const mockStore = configureStore()
    const customStore = mockStore({
      ...appState,
      client: {
        appDetail: {
          data: {},
          loading: false,
        },
      },
    })

    const wrapper = mount(
      <ReactRedux.Provider store={customStore}>
        <MemoryRouter initialEntries={[{ pathname: Routes.APP_DETAIL, key: 'clientAppDetailRoute' }]}>
          <AppDetail />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )

    expect(wrapper).toMatchSnapshot()
    const loader = wrapper.find('[data-test="client-app-detail-loader"]')
    expect(loader.length).toBe(1)
  })

  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APP_DETAIL, key: 'clientAppDetailRoute' }]}>
            <AppDetail />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleCloseInstallConfirmationModal', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = handleCloseInstallConfirmationModal(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(false)
    })
  })

  describe('handleInstallAppButtonClick', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = handleInstallAppButtonClick(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(true)
    })
  })

  describe('handleCloseUnInstallConfirmationModal', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = handleCloseUnInstallConfirmationModal(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(false)
    })
  })

  describe('handleUnInstallAppButtonClick', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = handleUnInstallAppButtonClick(mockFunction)
      fn()
      expect(mockFunction).toBeCalledWith(true)
    })
  })

  describe('onBackToAppsButtonClick', () => {
    it('should run correctly', () => {
      const fn = onBackToAppsButtonClick(history)
      fn()
      expect(history.push).toBeCalledWith(Routes.APPS)
    })
  })
})
