import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { MemoryRouter } from 'react-router'
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
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'

const mockProps: ClientAppInstallConfirmationProps = {
  appDetailData: appDetailDataStub.data,
  visible: true,
  closeInstallConfirmationModal: jest.fn(),
}

describe('ClientAppInstallConfirmation', () => {
  let store
  let spyDispatch
  const appId = mockProps.appDetailData?.id || ''
  const clientId = appState.auth.loginSession?.loginIdentity.clientId || ''
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    /* mocking useDispatch on our mock store  */
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT_APP_DETAIL, key: 'clientAppDetailRoute' }]}>
            <ClientAppInstallConfirmation {...mockProps} />
          </MemoryRouter>
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
        false,
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
        false,
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
    } as any
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
