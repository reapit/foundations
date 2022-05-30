import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { MemoryRouter } from 'react-router'
import { render } from '../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import { getMockRouterProps } from '@/utils/mock-helper'
import AppDetail, {
  handleCloseInstallConfirmationModal,
  handleInstallAppButtonClick,
  handleCloseUnInstallConfirmationModal,
  handleUnInstallAppButtonClick,
  onBackToAppsButtonClick,
  handleCloseNonAdminModal,
} from '../app-detail'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import { Loader } from '@reapit/elements'

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

    const wrapper = render(
      <ReactRedux.Provider store={customStore}>
        <MemoryRouter initialEntries={[{ pathname: Routes.APP_DETAIL, key: 'clientAppDetailRoute' }]}>
          <AppDetail />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )

    expect(wrapper).toMatchSnapshot()
    const loader = wrapper.find(Loader)
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

    const wrapper = render(
      <ReactRedux.Provider store={customStore}>
        <MemoryRouter initialEntries={[{ pathname: Routes.APP_DETAIL, key: 'clientAppDetailRoute' }]}>
          <AppDetail />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )

    expect(wrapper).toMatchSnapshot()
    const loader = wrapper.find(Loader)
    expect(loader.length).toBe(1)
  })

  it('should match a snapshot', () => {
    expect(
      render(
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
      const setNonAdminModalType = jest.fn()
      const isAdmin = true
      const fn = handleInstallAppButtonClick(mockFunction, setNonAdminModalType, isAdmin)
      fn()
      expect(mockFunction).toBeCalledWith(true)
    })
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const setNonAdminModalType = jest.fn()
      const isAdmin = false
      const fn = handleInstallAppButtonClick(mockFunction, setNonAdminModalType, isAdmin)
      fn()
      expect(setNonAdminModalType).toBeCalledWith('INSTALL')
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
      const setNonAdminModalType = jest.fn()
      const isAdmin = false
      const fn = handleUnInstallAppButtonClick(mockFunction, setNonAdminModalType, isAdmin)
      fn()
      expect(setNonAdminModalType).toBeCalledWith('UNINSTALL')
    })
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const setNonAdminModalType = jest.fn()
      const isAdmin = true
      const fn = handleUnInstallAppButtonClick(mockFunction, setNonAdminModalType, isAdmin)
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
  describe('handleCloseNonAdminModal', () => {
    const setNonAdminModalType = jest.fn()
    const fn = handleCloseNonAdminModal(setNonAdminModalType)
    fn()
    expect(setNonAdminModalType).toBeCalledWith(null)
  })
})
