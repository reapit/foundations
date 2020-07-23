import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {
  PrivateRoute,
  isNotAllowedToAccess,
  handleChangeLoginType,
  handleRedirectToAuthenticationPage,
} from '../private-route'
import appState from '@/reducers/__stubs__/app-state'
import { LoginIdentity } from '@reapit/cognito-auth'
import { authChangeLoginType } from '@/actions/auth'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'

describe('PrivateRouter', () => {
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
          <MemoryRouter initialEntries={[{ pathname: Routes.APPS, key: 'clientAppsRoute' }]}>
            <PrivateRoute allow="CLIENT" component={() => null} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('isNotAllowedToAccess', () => {
    it('should return false if loginIdentity is empty', () => {
      expect(isNotAllowedToAccess('CLIENT')).toBeFalsy()
    })
    it('should return true if adminId, clientId and developerId are empty', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: '',
        adminId: '',
      } as LoginIdentity
      expect(isNotAllowedToAccess('CLIENT', mockLoginIdentity)).toBeTruthy()
    })
    it('should return false if clientId exists and loginType is CLIENT', () => {
      const mockLoginIdentity = {
        clientId: 'testClientId',
        developerId: '',
        adminId: '',
      } as LoginIdentity
      expect(isNotAllowedToAccess('CLIENT', mockLoginIdentity)).toBeFalsy()
    })
    it('should return false if developerId exists and loginType is DEVELOPER', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
        adminId: '',
      } as LoginIdentity
      expect(isNotAllowedToAccess('DEVELOPER', mockLoginIdentity)).toBeFalsy()
    })

    it('should return false if adminId exists and loginType is ADMIN', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
        adminId: 'testAdminId',
      } as LoginIdentity
      expect(isNotAllowedToAccess('ADMIN', mockLoginIdentity)).toBeFalsy()
    })
  })

  describe('handleChangeLoginType', () => {
    it('should dispatch authChangeLoginType to change loginType to DEVELOPER', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
        adminId: '',
      } as LoginIdentity
      const fn = handleChangeLoginType('CLIENT', 'DEVELOPER', spyDispatch, mockLoginIdentity, false)
      fn()
      expect(spyDispatch).toBeCalledWith(authChangeLoginType('DEVELOPER'))
    })
    it('should dispatch authChangeLoginType to change loginType to CLIENT', () => {
      const mockLoginIdentity = {
        clientId: 'testClient',
        developerId: '',
        adminId: '',
      } as LoginIdentity
      const fn = handleChangeLoginType('DEVELOPER', 'CLIENT', spyDispatch, mockLoginIdentity, false)
      fn()
      expect(spyDispatch).toBeCalledWith(authChangeLoginType('CLIENT'))
    })

    it('should dispatch authChangeLoginType to change loginType to CLIENT', () => {
      const mockDispatch = jest.fn()
      const mockLoginIdentity = {
        clientId: 'testClient',
        developerId: '',
        adminId: '',
      } as LoginIdentity
      const fn = handleChangeLoginType('DEVELOPER', 'CLIENT', mockDispatch, mockLoginIdentity, true)
      fn()
      expect(mockDispatch).not.toBeCalled()
    })

    it('should dispatch authChangeLoginType to change loginType to ADMIN', () => {
      const mockDispatch = jest.fn()
      const mockLoginIdentity = {
        clientId: '',
        developerId: '',
        adminId: 'testAdminId',
      } as LoginIdentity
      const fn = handleChangeLoginType('DEVELOPER', 'ADMIN', mockDispatch, mockLoginIdentity, true)
      fn()
      expect(mockDispatch).not.toBeCalled()
    })
  })

  describe('handleRedirectToAuthenticationPage', () => {
    it('should redirect to authentication page for CLIENT', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
      } as LoginIdentity
      const mockAllow = 'CLIENT'
      const fn = handleRedirectToAuthenticationPage(mockAllow, history, mockLoginIdentity)
      fn()
      expect(history.replace).toBeCalledWith(`${Routes.AUTHENTICATION}/${mockAllow.toLowerCase()}`)
    })

    it('should redirect to authentication page for DEVELOPER', () => {
      const mockLoginIdentity = {
        clientId: 'testClientId',
        developerId: '',
      } as LoginIdentity
      const mockAllow = 'DEVELOPER'
      const fn = handleRedirectToAuthenticationPage(mockAllow, history, mockLoginIdentity)
      fn()
      expect(history.replace).toBeCalledWith(`${Routes.AUTHENTICATION}/${mockAllow.toLowerCase()}`)
    })
  })
})
