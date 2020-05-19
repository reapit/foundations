import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount, shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import Authentication, {
  renderDeveloperModal,
  renderClientModal,
  onLogoutButtonClick,
  onMarketplaceButtonClick,
  onRegisterButtonClick,
  onDevelopersButtonClick,
} from '../authentication'
import { authLogout } from '@/actions/auth'
import { getMockRouterProps } from '@/utils/mock-helper'

describe('Authentication', () => {
  const { history } = getMockRouterProps({})
  let store
  let spyDispatch
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
    spyDispatch = jest.spyOn(ReactRedux, 'useDispatch').mockImplementation(() => store.dispatch)
  })
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.AUTHENTICATION, key: 'authenticationRoute' }]}>
            <Authentication />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('renderDeveloperModal', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<div>{renderDeveloperModal(history, spyDispatch)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderClientModal', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(<div>{renderClientModal(history, spyDispatch)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('onLogoutButtonClick', () => {
    it('should run correctly', () => {
      const fn = onLogoutButtonClick(spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(authLogout())
    })
  })
  describe('onMarketplaceButtonClick', () => {
    it('should run correctly', () => {
      const fn = onMarketplaceButtonClick(history)
      fn()
      expect(history.replace).toBeCalledWith(Routes.CLIENT)
    })
  })
  describe('onRegisterButtonClick', () => {
    it('should run correctly', () => {
      const fn = onRegisterButtonClick(history)
      fn()
      expect(history.replace).toBeCalledWith(Routes.REGISTER)
    })
  })
  describe('onDevelopersButtonClick', () => {
    it('should run correctly', () => {
      const fn = onDevelopersButtonClick(history)
      fn()
      expect(history.replace).toBeCalledWith(Routes.DEVELOPER_MY_APPS)
    })
  })
})
