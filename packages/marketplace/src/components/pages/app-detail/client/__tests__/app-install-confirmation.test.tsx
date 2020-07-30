import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { MemoryRouter } from 'react-router'
import AppInstallConfirmation, {
  AppInstallConfirmationProps,
  handleInstallButtonClick,
  handleInstallAppSuccessCallback,
  handleSuccessAlertButtonClick,
  handleSuccessAlertMessageAfterClose,
  InstallDirectApiAppSucesfullyModal,
  InstallAppSucesfullyModalParams,
  InstallNonDirectApiAppSucesfullyModal,
} from '../app-install-confirmation'
import { appInstallationsRequestInstall } from '@/actions/installations'
import { fetchAppDetail } from '@/actions/apps'
import routes from '@/constants/routes'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'

const mockProps: AppInstallConfirmationProps = {
  appDetailData: appDetailDataStub.data,
  visible: true,
  closeInstallConfirmationModal: jest.fn(),
}

describe('InstallNonDirectApiAppSucesfullyModal', () => {
  it(' should match a snapshot', () => {
    const props: InstallAppSucesfullyModalParams = {
      visible: true,
      onSuccessAlertButtonClick: jest.fn(),
      afterClose: jest.fn(),
      appDetailData: appDetailDataStub.data,
    }

    expect(mount(<InstallNonDirectApiAppSucesfullyModal {...props} />)).toMatchSnapshot()
  })
})

describe('InstallDirectApiAppSucesfullyModal', () => {
  it(' should match a snapshot', () => {
    const props: InstallAppSucesfullyModalParams = {
      visible: true,
      onSuccessAlertButtonClick: jest.fn(),
      afterClose: jest.fn(),
      appDetailData: appDetailDataStub.data,
    }

    expect(mount(<InstallDirectApiAppSucesfullyModal {...props} />)).toMatchSnapshot()
  })
})

const clientId = '123'
describe('ClientAppInstallConfirmation', () => {
  let store
  let spyDispatch
  const appId = mockProps.appDetailData?.id || ''

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
          <MemoryRouter initialEntries={[{ pathname: Routes.APP_DETAIL, key: 'clientAppDetailRoute' }]}>
            <AppInstallConfirmation {...mockProps} />
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

  describe('handleSuccessAlertMessageAfterClose', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = handleSuccessAlertMessageAfterClose(appId, clientId, mockFunction, spyDispatch)
      fn()
      expect(mockFunction).toBeCalledWith(false)
      expect(spyDispatch).toBeCalledWith(
        fetchAppDetail({
          id: appId,
          clientId,
        }),
      )
    })
  })

  describe('handleInstallAppSuccessCallback', () => {
    it('should run correctly', () => {
      const mockFunction = jest.fn()
      const fn = handleInstallAppSuccessCallback(mockFunction, mockProps.closeInstallConfirmationModal, false)
      fn()

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
    expect(history.replace).toBeCalledWith(routes.APPS)
  })
})
