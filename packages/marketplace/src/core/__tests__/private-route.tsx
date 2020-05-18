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

describe('PrivateRouter', () => {
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
          <MemoryRouter initialEntries={['/client']}>
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
      const fn = handleChangeLoginType(mockLoginIdentity, 'CLIENT', 'DEVELOPER', spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(authChangeLoginType('DEVELOPER'))
    })
    it('should dispatch authChangeLoginType to change loginType to CLIENT', () => {
      const mockLoginIdentity = {
        clientId: 'testClient',
        developerId: '',
      } as LoginIdentity
      const fn = handleChangeLoginType(mockLoginIdentity, 'DEVELOPER', 'CLIENT', spyDispatch)
      fn()
      expect(spyDispatch).toBeCalledWith(authChangeLoginType('CLIENT'))
    })
  })

  describe('handleRedirectToAuthenticationPage', () => {
    const { location } = window

    beforeAll((): void => {
      delete window.location
      // @ts-ignore
      window.location = {
        href: '',
      }
    })

    afterAll((): void => {
      window.location = location
    })

    it('should redirect to authentication page for CLIENT', () => {
      const mockLoginIdentity = {
        clientId: '',
        developerId: 'testDeveloperId',
      } as LoginIdentity
      const mockAllow = 'CLIENT'
      const fn = handleRedirectToAuthenticationPage(mockLoginIdentity, mockAllow)
      fn()
      expect(window.location.href).toBe(`${Routes.Authentication}/${mockAllow}`)
    })

    it('should redirect to authentication page for DEVELOPER', () => {
      const mockLoginIdentity = {
        clientId: 'testClientId',
        developerId: '',
      } as LoginIdentity
      const mockAllow = 'DEVELOPER'
      const fn = handleRedirectToAuthenticationPage(mockLoginIdentity, mockAllow)
      fn()
      expect(window.location.href).toBe(`${Routes.Authentication}/${mockAllow}`)
    })
  })
})
