import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { render } from '../../../tests/react-testing'
import configureStore from 'redux-mock-store'
import { PrivateRoute, handleRedirectToAuthenticationPage } from '../private-route'
import appState from '@/reducers/__stubs__/app-state'
import { LoginIdentity } from '@reapit/connect-session'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'

describe('PrivateRouter', () => {
  const { history } = getMockRouterProps({})
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  it('should match a snapshot', () => {
    expect(
      render(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APPS, key: 'clientAppsRoute' }]}>
            <PrivateRoute component={() => null} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('handleRedirectToAuthenticationPage', () => {
    it('should not redirect to authentication page for DEVELOPER EDITION only', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
      } as LoginIdentity
      const fn = handleRedirectToAuthenticationPage(history, mockLoginIdentity, true, false)
      fn()
      expect(history.replace).not.toHaveBeenCalled()
    })

    it('should not redirect to authentication page for CLIENT only', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
      } as LoginIdentity
      const fn = handleRedirectToAuthenticationPage(history, mockLoginIdentity, false, true)
      fn()
      expect(history.replace).not.toHaveBeenCalled()
    })

    it('should redirect to authentication page if neither CLIENT or DEVELOPER EDITION', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
      } as LoginIdentity
      const fn = handleRedirectToAuthenticationPage(history, mockLoginIdentity, false, false)
      fn()
      expect(history.replace).toBeCalledWith(Routes.AUTHENTICATION)
    })
  })
})
