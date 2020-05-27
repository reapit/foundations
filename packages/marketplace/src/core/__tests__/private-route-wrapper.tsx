import * as React from 'react'
import { MemoryRouter, useLocation } from 'react-router'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { PrivateRouteWrapper } from '../private-route-wrapper'
import { selectLoginSession, selectRefreshSession, selectLoginType } from '@/selector/auth'
import { getTokenFromQueryString, redirectToOAuth, RefreshParams } from '@reapit/cognito-auth'
import { getDefaultRouteByLoginType, getAuthRouteByLoginType } from '@/utils/auth-route'
import {
  getCookieString,
  COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE,
  COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE,
} from '@/utils/cookie'
import {
  authSetRefreshSession,
  setInitDeveloperTermsAcceptedStateFromCookie,
  setInitClientTermsAcceptedStateFromCookie,
} from '@/actions/auth'

const locationMock = { search: '?state=CLIENT', pathname: '/' }
const refreshParams = appState.auth.refreshSession as RefreshParams
const dispatch = jest.fn()

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(() => dispatch),
  useSelector: jest.fn(() => jest.fn()),
}))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => locationMock),
}))

jest.mock('@reapit/cognito-auth', () => ({
  ...jest.requireActual('@reapit/cognito-auth'),
  getTokenFromQueryString: jest.fn(() => refreshParams),
  redirectToOAuth: jest.fn(),
}))

jest.mock('@/utils/auth-route', () => ({
  getDefaultRouteByLoginType: jest.fn(() => 'login-type-route'),
  getAuthRouteByLoginType: jest.fn(() => 'auth-route'),
}))

jest.mock('@/utils/cookie', () => ({
  ...jest.requireActual('@/utils/cookie'),
  getCookieString: jest.fn(() => 'cookie-string'),
}))

jest.mock('@/actions/auth')

describe('PrivateRouteWrapper', () => {
  let store
  beforeEach(() => {
    const mockStore = configureStore()
    store = mockStore(appState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(<PrivateRouteWrapper path="/" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should call hooks and functions with correct params', () => {
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRouteWrapper path="/" />
        </MemoryRouter>
      </Provider>,
    )
    expect(useDispatch).toHaveBeenCalled()
    expect(useSelector).toHaveBeenCalledWith(selectLoginSession)
    expect(useSelector).toHaveBeenCalledWith(selectRefreshSession)
    expect(useSelector).toHaveBeenCalledWith(selectLoginType)
    expect(useLocation).toHaveBeenCalled()
    expect(getCookieString).toHaveBeenCalledWith(COOKIE_DEVELOPER_FIRST_TIME_LOGIN_COMPLETE)
    expect(getCookieString).toHaveBeenCalledWith(COOKIE_CLIENT_FIRST_TIME_LOGIN_COMPLETE)
    expect(getTokenFromQueryString).toHaveBeenCalledWith(
      locationMock.search,
      window.reapit.config.cognitoClientId,
      'CLIENT',
      'login-type-route',
    )
  })

  it('should call correct functions with refreshParams && !hasSession case', () => {
    const mockStore = configureStore()
    const customizedAppState = { ...appState, auth: { ...appState.auth, loginSession: null, refreshSession: null } }
    store = mockStore(customizedAppState)
    // mock useSelector to return loginSession & refreshSession as null
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => null)
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => null)
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRouteWrapper path="/" />
        </MemoryRouter>
      </Provider>,
    )
    expect(dispatch).toHaveBeenCalledWith(authSetRefreshSession(refreshParams))
  })

  it('should call correct functions with type && location.pathname ===  / case', () => {
    // mock useSelector to return loginSession & refreshSession
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => appState.auth.loginSession)
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => appState.auth.refreshSession)
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRouteWrapper path="/" />
        </MemoryRouter>
      </Provider>,
    )
    expect(getAuthRouteByLoginType).toHaveBeenCalledWith('CLIENT')
  })

  it('should call correct functions with !hasSession case', () => {
    // mock useSelector to return loginSession & refreshSession as null
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => null)
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => null)
    ;(getTokenFromQueryString as jest.Mocked<any>).mockImplementationOnce(() => refreshParams),
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <PrivateRouteWrapper path="/" />
          </MemoryRouter>
        </Provider>,
      )
    expect(redirectToOAuth).toHaveBeenCalledWith(window.reapit.config.cognitoClientId, 'login-type-route', 'CLIENT')
  })
})
