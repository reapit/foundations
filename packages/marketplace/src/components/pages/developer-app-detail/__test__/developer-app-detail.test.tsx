import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { ReduxState } from '@/types/core'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import DeveloperAppDetail, {
  handleOnDeleteAppSuccess,
  renderAppHeaderButtonGroup,
  closeInstallationsModal,
  closeAppRevisionComparisionModal,
  closeDeleteAppModal,
} from '../developer-app-detail'
import routes from '@/constants/routes'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'

const mockState = {
  ...appState,
  auth: {
    loginType: 'DEVELOPER',
  },
} as ReduxState

describe('DeveloperAppDetail', () => {
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
          <MemoryRouter initialEntries={[{ pathname: Routes.DEVELOPER_APP_DETAIL, key: 'developerAppDetailRoute' }]}>
            <DeveloperAppDetail />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('renderAppHeaderButtonGroup', () => {
    const mockAppId = 'testAppId'
    it('should match snapshot', () => {
      const wrapper = shallow(
        <div>
          {renderAppHeaderButtonGroup(
            mockAppId,
            mockState.developer.developerAppDetail,
            jest.fn(),
            jest.fn(),
            jest.fn(),
          )}
        </div>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleOnDeleteAppSuccess', () => {
    const history = {
      replace: jest.fn(),
    } as any
    const fn = handleOnDeleteAppSuccess(history)
    fn()
    expect(history.replace).toBeCalledWith(routes.DEVELOPER_MY_APPS)
  })
  describe('handleOnDeleteAppSuccess', () => {
    const mockFunction = jest.fn()
    const fn = closeInstallationsModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
  describe('closeAppRevisionComparisionModal', () => {
    const mockFunction = jest.fn()
    const fn = closeAppRevisionComparisionModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
  describe('closeDeleteAppModal', () => {
    const mockFunction = jest.fn()
    const fn = closeDeleteAppModal(mockFunction)
    fn()
    expect(mockFunction).toBeCalledWith(false)
  })
})
