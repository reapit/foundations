import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { PrivateRoute, isNotAllowedToAccess, handleRedirectToAuthenticationPage } from '../private-route'
import appState from '@/reducers/__stubs__/app-state'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'
import { LoginIdentity } from '@reapit/connect-session'

jest.mock('@/utils/session')

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
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.DEVELOPER, key: 'developerAppsRoute' }]}>
            <PrivateRoute component={() => null} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('isNotAllowedToAccess', () => {
    it('should return false if loginIdentity is empty', () => {
      expect(isNotAllowedToAccess({} as LoginIdentity)).toBeFalsy()
    })
    it('should return true if loginIdentity is empty', () => {
      expect(isNotAllowedToAccess({ developerId: 'developerId' } as LoginIdentity)).toBeTruthy()
    })
  })

  describe('handleRedirectToAuthenticationPage', () => {
    it('should redirect to authentication page for CLIENT', () => {
      const mockLoginIdentity = {
        developerId: '',
      } as LoginIdentity
      const fn = handleRedirectToAuthenticationPage(history, mockLoginIdentity)
      fn()
      expect(history.replace).toBeCalledWith(`${Routes.AUTHENTICATION}/developer`)
    })
  })
})
