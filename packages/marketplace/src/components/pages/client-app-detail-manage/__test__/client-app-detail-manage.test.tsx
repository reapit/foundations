import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import TestRenderer from 'react-test-renderer'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import ClientAppDetailManage, {
  handleCloseUninstallConfirmationModal,
  handleUninstallAppButtonClick,
  renderAppHeaderButtonGroup,
} from '../client-app-detail-manage'
import { Button } from '@reapit/elements'
import Routes from '@/constants/routes'

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

describe('ClientAppDetailManage', () => {
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
          <MemoryRouter
            initialEntries={[{ pathname: Routes.CLIENT_APP_DETAIL_MANAGE, key: 'clientAppDetailManageRoute' }]}
          >
            <ClientAppDetailManage />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('renderAppHeaderButtonGroup', () => {
    const mockInstalledOn = '2020-2-20'
    it('should match snapshot', () => {
      const wrapper = shallow(<div>{renderAppHeaderButtonGroup(mockInstalledOn, jest.fn())}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render install app button if installedOn is existed', () => {
      const testRenderer = TestRenderer.create(renderAppHeaderButtonGroup(mockInstalledOn, jest.fn()))
      const testInstance = testRenderer.root
      expect(testInstance.findByType(Button).props.children).toBe('Uninstall App')
    })
    it('should render install app button if installedOn is empty', () => {
      const testRenderer = TestRenderer.create(renderAppHeaderButtonGroup(null, jest.fn()))
      expect(testRenderer.getInstance()).toBeNull()
    })
  })
  describe('handleCloseUninstallConfirmationModal', () => {
    const mockFunction = jest.fn()
    const fn = handleCloseUninstallConfirmationModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
  describe('handleUninstallAppButtonClick', () => {
    const mockFunction = jest.fn()
    const fn = handleUninstallAppButtonClick(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(true)
  })
})
