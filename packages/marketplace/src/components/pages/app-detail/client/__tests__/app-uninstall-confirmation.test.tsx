import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { render } from '../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { uninstallApp } from '@/actions/installations'
import { fetchAppDetail } from '@/actions/apps'
import ClientAppUninstallConfirmation, {
  AppUninstallConfirmationProps,
  onUninstallButtonClick,
  handleUninstallAppSuccessCallback,
  handleSuccessAlertButtonClick,
  handleSuccessAlertMessageAfterClose,
  renderUninstallConfirmationModalFooter,
  UninstallationsSuccessModal,
  UninstallationsSuccessModalParams,
} from '../app-uninstall-confirmation'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'

const mockProps: AppUninstallConfirmationProps = {
  appDetailData: appDetailDataStub.data,
  visible: true,
  closeUninstallConfirmationModal: jest.fn(),
}

const mockUninstallationsSuccessModalProps: UninstallationsSuccessModalParams = {
  appDetailData: appDetailDataStub.data,
  visible: true,
  onSuccessAlertButtonClick: jest.fn(),
  hasPermissionError: false,
}

const clientId = '123'
describe('ClientAppUninstallConfirmation', () => {
  let store
  let spyDispatch
  const appId = mockProps.appDetailData?.id || ''
  const installationId = mockProps.appDetailData?.installationId || ''

  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    /* mocking useDispatch on our mock store  */
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })

  it('should match a snapshot', () => {
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APP_DETAIL, key: 'clientAppDetailRoute' }]}>
            <ClientAppUninstallConfirmation {...mockProps} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('onUninstallButtonClick', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = onUninstallButtonClick(
        appId,
        installationId,
        spyDispatch,
        mockFunction,
        mockProps.closeUninstallConfirmationModal,
        mockFunction,
        false,
      )
      fn()
      expect(spyDispatch).toBeCalledWith(
        uninstallApp({
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
        mockFunction,
        mockProps.closeUninstallConfirmationModal,
        mockFunction,
        false,
      )
      fn(false)
      expect(mockProps.closeUninstallConfirmationModal).toBeCalled()
      expect(mockFunction).toBeCalledWith(true)
    })

    it('should run correctly where has error', () => {
      const mockFunction = jest.fn()
      const fn = handleUninstallAppSuccessCallback(
        mockFunction,
        mockProps.closeUninstallConfirmationModal,
        mockFunction,
        false,
      )
      fn(true)
      expect(mockProps.closeUninstallConfirmationModal).toBeCalled()
      expect(mockFunction).toBeCalledWith(true)
      expect(mockFunction).toBeCalledTimes(2)
    })
  })

  describe('handleSuccessAlertButtonClick', () => {
    const history = {
      replace: jest.fn(),
    } as any
    const fn = handleSuccessAlertButtonClick(history)
    fn()
    expect(history.replace).toBeCalledWith(Routes.APPS)
  })

  describe('handleSuccessAlertMessageAfterClose', () => {
    it('should match snapshot', () => {
      const mockFunction = jest.fn()
      const fn = handleSuccessAlertMessageAfterClose(appId, clientId, mockFunction, spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(
        fetchAppDetail({
          id: appId,
          clientId,
        }),
      )
      expect(mockFunction).toBeCalledWith(false)
    })
  })

  describe('renderUninstallConfirmationModalFooter', () => {
    it('should match snapshot', () => {
      const wrapper = render(
        <div>
          {renderUninstallConfirmationModalFooter(
            false,
            appId,
            installationId,
            spyDispatch,
            jest.fn(),
            jest.fn(),
            jest.fn(),
            false,
          )}
        </div>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('UninstallationsSuccessModal', () => {
    it('should match a snapshot', () => {
      expect(render(<UninstallationsSuccessModal {...mockUninstallationsSuccessModalProps} />)).toMatchSnapshot()
    })
  })
})
