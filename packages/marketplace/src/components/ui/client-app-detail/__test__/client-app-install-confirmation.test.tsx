import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { Router } from 'react-router'
import { createMemoryHistory } from 'history'
import ClientAppInstallConfirmation, {
  ClientAppInstallConfirmationProps,
  handleInstallButtonClick,
  handleInstallAppSuccessCallback,
  handleSuccessAlertButtonClick,
  handleSuccessAlertMessageAfterClose,
} from '../client-app-install-confirmation'
import { appInstallationsRequestInstall } from '@/actions/app-installations'
import { clientFetchAppDetail } from '@/actions/client'
import routes from '@/constants/routes'

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

const mockProps: ClientAppInstallConfirmationProps = {
  appDetailData: appDetailDataStub.data,
  visible: true,
  closeInstallConfirmationModal: jest.fn(),
}

describe('ClientAppInstallConfirmation', () => {
  let store
  let spyDispatch
  const appId = mockProps.appDetailData?.id || ''
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
            <ClientAppInstallConfirmation {...mockProps} />
          </Router>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('handleInstallButtonClick', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = handleInstallButtonClick(
        appId,
        clientId,
        spyDispatch,
        mockFunction,
        mockProps.closeInstallConfirmationModal,
      )
      fn()
      expect(spyDispatch).toBeCalledWith(
        appInstallationsRequestInstall({
          appId,
          callback: expect.any(Function),
        }),
      )
    })
  })
  describe('handleInstallAppSuccessCallback', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = handleInstallAppSuccessCallback(
        appId,
        clientId,
        spyDispatch,
        mockFunction,
        mockProps.closeInstallConfirmationModal,
      )
      fn()
      expect(spyDispatch).toBeCalledWith(
        clientFetchAppDetail({
          id: appId,
          clientId,
        }),
      )
      expect(mockProps.closeInstallConfirmationModal).toBeCalled()
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
