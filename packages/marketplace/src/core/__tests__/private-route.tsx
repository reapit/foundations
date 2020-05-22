import * as React from 'react'
import * as ReactRedux from 'react-redux'
import { mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import {
  PrivateRoute,
  isNotAllowedToAccess,
  handleChangeLoginType,
  handleRedirectToAuthenticationPage,
  fetchAccessToken,
} from '../private-route'
import appState from '@/reducers/__stubs__/app-state'
import { LoginIdentity } from '@reapit/cognito-auth'
import { authChangeLoginType } from '@/actions/auth'
import Routes from '@/constants/routes'
import { MemoryRouter } from 'react-router'
import { getMockRouterProps } from '@/utils/mock-helper'
import { getAccessToken } from '@/utils/session'

jest.mock('@/utils/session')

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

  describe('fetchAccessToken', () => {
    it('should run correctly', async () => {
      fetchAccessToken()
      expect(getAccessToken).toHaveBeenCalledTimes(1)
    })
  })

  it('should match a snapshot', () => {
    expect(
      mount(
        <ReactRedux.Provider store={store}>
          <MemoryRouter initialEntries={[{ pathname: Routes.CLIENT, key: 'clientAppsRoute' }]}>
            <PrivateRoute allow="CLIENT" component={() => null} />
          </MemoryRouter>
        </ReactRedux.Provider>,
      ),
    ).toMatchSnapshot()
  })

  describe('isNotAllowedToAccess', () => {
    it('should return false if loginIdentity is empty', () => {
      expect(isNotAllowedToAccess()).toBeFalsy
    })
    it('should return true if both clientId and developerId are empty', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: '',
      } as LoginIdentity
      expect(isNotAllowedToAccess(mockLoginIdentity)).toBeTruthy
    })
    it('should return false if clientId is existed', () => {
      const mockLoginIdentity = {
        clientId: 'testClientId',
        developerId: '',
      } as LoginIdentity
      expect(isNotAllowedToAccess(mockLoginIdentity)).toBeFalsy
    })
    it('should return false if developerId is existed', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
      } as LoginIdentity
      expect(isNotAllowedToAccess(mockLoginIdentity)).toBeFalsy
    })
  })

  describe('handleChangeLoginType', () => {
    it('should dispatch authChangeLoginType to change loginType to DEVELOPER', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
      } as LoginIdentity
      const fn = handleChangeLoginType('CLIENT', 'DEVELOPER', spyDispatch, mockLoginIdentity)
      fn()
      expect(spyDispatch).toBeCalledWith(authChangeLoginType('DEVELOPER'))
    })
    it('should dispatch authChangeLoginType to change loginType to CLIENT', () => {
      const mockLoginIdentity = {
        clientId: 'testClient',
        developerId: '',
      } as LoginIdentity
      const fn = handleChangeLoginType('DEVELOPER', 'CLIENT', spyDispatch, mockLoginIdentity)
      fn()
      expect(spyDispatch).toBeCalledWith(authChangeLoginType('CLIENT'))
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
