import * as React from 'react'
import * as ReactRedux from 'react-redux'
import TestRenderer from 'react-test-renderer'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { ReduxState } from '@/types/core'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import ClientAppDetail, {
  handleCloseInstallConfirmationModal,
  handleInstallAppButtonClick,
  renderAppHeaderButtonGroup,
} from '../client-app-detail'
import { Button } from '@reapit/elements'

const mockState = {
  client: {
    appDetail: {
      data: appDetailDataStub.data,
      isAppDetailLoading: false,
    },
    appSummary: {
      data: null,
      isAppSummaryLoading: false,
    },
  },
  auth: {
    loginType: 'CLIENT',
  },
  installations: {},
} as ReduxState

describe('ClientAppDetail', () => {
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
  })
  it('should match a snapshot', () => {
    const history = createMemoryHistory()
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <Router history={history}>
            <ClientAppDetail />
          </Router>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('renderAppHeaderButtonGroup', () => {
    const mockAppId = 'test'
    const mockInstalledOn = '2020-2-20'
    it('should match snapshot', () => {
      const wrapper = shallow(<div>{renderAppHeaderButtonGroup(mockAppId, mockInstalledOn, jest.fn())}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render header button group when appId is existed', () => {
      const testRenderer = TestRenderer.create(renderAppHeaderButtonGroup(mockAppId, mockInstalledOn, jest.fn()))
      const testInstance = testRenderer.root
      expect(testInstance.children.length).toBe(1)
    })
    it('should render install app button if installedOn is empty', () => {
      const testRenderer = TestRenderer.create(renderAppHeaderButtonGroup(mockAppId, null, jest.fn()))
      const testInstance = testRenderer.root
      expect(testInstance.findByType(Button).props.children).toBe('Install App')
    })
    it('should render installed label if installedOn is existed', () => {
      const testRenderer = TestRenderer.create(renderAppHeaderButtonGroup(mockAppId, mockInstalledOn, jest.fn()))
      const testInstance = testRenderer.root
      expect(
        testInstance.findByProps({
          id: 'installed-label-container',
        }).children.length,
      ).toBeGreaterThan(0)
    })
    it('should not render header button group when appId is empty', () => {
      const testRenderer = TestRenderer.create(renderAppHeaderButtonGroup(null, mockInstalledOn, jest.fn()))
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
})
