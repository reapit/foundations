import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {
  PrivateRoute,
  // FIXME(selectLoginIdentity)
  // remove
  handleRedirectToAuthenticationPage,
} from '../private-route'
import appState from '@/reducers/__stubs__/app-state'
import { LoginIdentity } from '@reapit/cognito-auth'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'

// FIXME(selectLoginIdentity)
describe('PrivateRouter', () => {
  const { history } = getMockRouterProps({})
  let store
  beforeEach(() => {
    /* mocking store */
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  // FIXME(selectLoginIdentity)
  // remove allow
  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.APPS, key: 'clientAppsRoute' }]}>
            <PrivateRoute component={() => null} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  // FIXME(selectLoginIdentity)
  // remove

  // FIXME(selectLoginIdentity)
  // fix
  describe('handleRedirectToAuthenticationPage', () => {
    it('should redirect to authentication page for CLIENT', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
      } as LoginIdentity
      // remove mock arrow
      const fn = handleRedirectToAuthenticationPage(history, mockLoginIdentity)
      fn()
      expect(history.replace).toBeCalledWith(Routes.AUTHENTICATION)
    })
  })
})
