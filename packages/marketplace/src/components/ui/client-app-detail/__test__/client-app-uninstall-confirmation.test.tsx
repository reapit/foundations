import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { appInstallationsRequestUninstall } from '@/actions/app-installations'
import { clientFetchAppDetail } from '@/actions/client'
import routes from '@/constants/routes'
import ClientAppUninstallConfirmation, {
  ClientAppUninstallConfirmationProps,
  onUninstallButtonClick,
  handleUninstallAppSuccessCallback,
  handleSuccessAlertButtonClick,
  handleSuccessAlertMessageAfterClose,
} from '../client-app-uninstall-confirmation'

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
    loginSession: {
      loginIdentity: {
        clientId: 'mockClientId',
      },
    },
  },
  installations: {},
} as ReduxState

const mockProps: ClientAppUninstallConfirmationProps = {
  appDetailData: appDetailDataStub.data,
  visible: true,
  closeUninstallConfirmationModal: jest.fn(),
}

describe('ClientAppUninstallConfirmation', () => {
  let store
  let spyDispatch
  const appId = mockProps.appDetailData?.id || ''
  const installationId = mockProps.appDetailData?.installationId || ''
  const clientId = mockState.auth.loginSession?.loginIdentity.clientId || ''
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(mockState)
    /* mocking useDispatch on our mock store  */
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    const history = createMemoryHistory()
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <Router history={history}>
            <ClientAppUninstallConfirmation {...mockProps} />
          </Router>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('onUninstallButtonClick', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = onUninstallButtonClick(
        appId,
        clientId,
        installationId,
        spyDispatch,
        mockFunction,
        mockProps.closeUninstallConfirmationModal,
      )
      fn()
      expect(spyDispatch).toBeCalledWith(
        appInstallationsRequestUninstall({
          appId,
          installationId,
          terminatedReason: 'User uninstall',
          callback: expect.any(Function),
        }),
      )
    })
  })
  describe('handleUninstallAppSuccessCallback', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = handleUninstallAppSuccessCallback(
        appId,
        clientId,
        spyDispatch,
        mockFunction,
        mockProps.closeUninstallConfirmationModal,
      )
      fn()
      expect(spyDispatch).toBeCalledWith(
        clientFetchAppDetail({
          id: appId,
          clientId,
        }),
      )
      expect(mockProps.closeUninstallConfirmationModal).toBeCalled()
      expect(mockFunction).toBeCalledWith(true)
    })
  })
  describe('handleSuccessAlertButtonClick', () => {
    const history = {
      replace: jest.fn(),
    }
    const fn = handleSuccessAlertButtonClick(history)
    fn()
    expect(history.replace).toBeCalledWith(routes.CLIENT)
  })
  describe('handleSuccessAlertMessageAfterClose', () => {
    const mockFunction = jest.fn()
    const fn = handleSuccessAlertMessageAfterClose(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
})
