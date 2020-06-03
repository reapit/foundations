import * as React from 'react'
import * as ReactRedux from 'react-redux'
import TestRenderer from 'react-test-renderer'
import { MemoryRouter } from 'react-router'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { getMockRouterProps } from '@/utils/mock-helper'
import ClientAppDetail, {
  handleCloseInstallConfirmationModal,
  handleInstallAppButtonClick,
  renderAppHeaderButtonGroup,
  handleCloseUnInstallConfirmationModal,
  handleUnInstallAppButtonClick,
  onBackToAppsButtonClick,
} from '../client-app-detail'
import { Button } from '@reapit/elements'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'

describe('ClientAppDetail', () => {
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
        <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT_APP_DETAIL, key: 'clientAppDetailRoute' }]}>
          <ClientAppDetail />
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
        <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT_APP_DETAIL, key: 'clientAppDetailRoute' }]}>
          <ClientAppDetail />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )

    expect(wrapper).toMatchSnapshot()
    const loader = wrapper.find('[data-test="client-app-detail-loader"]')
    expect(loader.length).toBe(1)
  })
  it('should not render loader when client.appDetail.data is not empty object and isLoadingAppDetail = true', () => {
    const mockStore = configureStore()
    const customStore = mockStore({
      ...appState,
      client: {
        appDetail: {
          data: { key: 'value' },
          loading: false,
        },
      },
    })

    const wrapper = mount(
      <ReactRedux.Provider store={customStore}>
        <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT_APP_DETAIL, key: 'clientAppDetailRoute' }]}>
          <ClientAppDetail />
        </MemoryRouter>
      </ReactRedux.Provider>,
    )

    expect(wrapper).toMatchSnapshot()
    const container = wrapper.find('[data-test="client-app-detail-container"]')
    expect(container.length).toBe(1)
  })
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT_APP_DETAIL, key: 'clientAppDetailRoute' }]}>
            <ClientAppDetail />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('renderAppHeaderButtonGroup', () => {
    const mockAppId = 'test'
    const mockInstalledOn = '2020-2-20'
    it('should match snapshot', () => {
      const wrapperWithIsInstallBtnHiddenTrue = shallow(
        <div>{renderAppHeaderButtonGroup(mockAppId, mockInstalledOn, jest.fn(), jest.fn(), true)}</div>,
      )
      expect(wrapperWithIsInstallBtnHiddenTrue).toMatchSnapshot()
      const wrapperWithIsInstallBtnHiddenFalse = shallow(
        <div>{renderAppHeaderButtonGroup(mockAppId, mockInstalledOn, jest.fn(), jest.fn(), false)}</div>,
      )
      expect(wrapperWithIsInstallBtnHiddenFalse).toMatchSnapshot()
    })
    it('should render header button group when appId is existed', () => {
      const testRenderer = TestRenderer.create(
        renderAppHeaderButtonGroup(mockAppId, mockInstalledOn, jest.fn(), jest.fn(), false),
      )
      const testInstance = testRenderer.root
      expect(testInstance.children.length).toBe(1)
    })
    it('should render install app button if installedOn is empty', () => {
      const testRenderer = TestRenderer.create(renderAppHeaderButtonGroup(mockAppId, '', jest.fn(), jest.fn(), false))
      const testInstance = testRenderer.root
      expect(testInstance.findByType(Button).props.children).toBe('Install App')
    })
    it('should render uninstall app button if installedOn is existed', () => {
      const testRenderer = TestRenderer.create(
        renderAppHeaderButtonGroup(mockAppId, 'exist', jest.fn(), jest.fn(), false),
      )
      const testInstance = testRenderer.root
      expect(testInstance.findByType(Button).props.children).toBe('Uninstall App')
    })
    it('should not render header button group when appId is empty', () => {
      const testRenderer = TestRenderer.create(
        renderAppHeaderButtonGroup('', mockInstalledOn, jest.fn(), jest.fn(), false),
      )
      const testInstance = testRenderer.getInstance
      expect(testInstance).toHaveLength(0)
    })
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
      expect(history.push).toBeCalledWith(Routes.CLIENT)
    })
  })
})
