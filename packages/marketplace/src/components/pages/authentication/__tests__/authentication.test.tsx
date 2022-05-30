import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { render } from '../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import Authentication, { renderModal, handleLogout, onDevelopersButtonClick } from '../authentication'
import { reapitConnectBrowserSession } from '@/core/connect-session'

jest.mock('@/core/connect-session', () => ({
  reapitConnectBrowserSession: {
    connectLogoutRedirect: jest.fn(),
  },
}))

describe('Authentication', () => {
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
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.AUTHENTICATION, key: 'authenticationRoute' }]}>
            <Authentication />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })
  describe('renderModal', () => {
    it('should match snapshot', () => {
      const DEVELOPER_PORTAL = 'DEVELOPER_PORTAL'
      const wrapper = render(<div>{renderModal(spyDispatch, DEVELOPER_PORTAL)}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleLogout', () => {
    it('should run correctly', () => {
      handleLogout()
      expect(reapitConnectBrowserSession.connectLogoutRedirect).toHaveBeenCalled()
    })
  })
  describe('onDevelopersButtonClick', () => {
    it('should run correctly', () => {
      const DEVELOPER_PORTAL = 'DEVELOPER_PORTAL'
      const fn = onDevelopersButtonClick(DEVELOPER_PORTAL)
      window.open = jest.fn()
      fn()
      expect(window.open).toBeCalledWith(DEVELOPER_PORTAL, '_self')
    })
  })
})
