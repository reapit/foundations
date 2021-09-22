import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import { MemoryRouter } from 'react-router'
import Routes from '@/constants/routes'
import appState from '@/reducers/__stubs__/app-state'
import Authentication, {
  onContinueButtonClick,
  onLogoutButtonClick,
  onMarketplaceButtonClick,
  onRegisterButtonClick,
} from '../authentication'
import { getMockRouterProps } from '@/utils/mock-helper'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { auth } from '../../../../selector/__mocks__/auth'
import { developerCreate } from '../../../../actions/developer'

describe('Authentication', () => {
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
          <MemoryRouter initialEntries={[{ pathname: Routes.AUTHENTICATION, key: 'authenticationRoute' }]}>
            <Authentication />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('onLogoutButtonClick', () => {
    it('should run correctly', () => {
      const fnSpy = jest.spyOn(reapitConnectBrowserSession, 'connectLogoutRedirect')
      onLogoutButtonClick()
      expect(fnSpy).toBeCalledWith()
    })
  })

  describe('onMarketplaceButtonClick', () => {
    it('should run correctly', () => {
      jest.spyOn(window, 'open')
      onMarketplaceButtonClick()
      expect(window.open).toBeCalledWith(window.reapit.config.marketplaceUrl, '_self')
      ;(window.open as jest.Mock).mockReset()
    })
  })

  describe('onRegisterButtonClick', () => {
    it('should run correctly', () => {
      const fn = onRegisterButtonClick(history)
      fn()
      expect(history.replace).toBeCalledWith(Routes.REGISTER)
    })
  })

  describe('onContinueButtonClick', () => {
    it('should run correctly', () => {
      const mockDispatch = jest.fn()
      const fn = onContinueButtonClick(mockDispatch, auth)
      fn()
      expect(mockDispatch).toBeCalledWith(
        developerCreate({
          name: auth.loginIdentity.name,
          companyName: auth.loginIdentity.orgName ?? '',
          email: auth.loginIdentity.email,
        }),
      )
    })
  })
})
