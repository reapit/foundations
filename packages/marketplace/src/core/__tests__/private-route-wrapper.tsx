import * as React from 'react'
import { MemoryRouter, useLocation } from 'react-router'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { shallow, mount } from 'enzyme'
import configureStore from 'redux-mock-store'
import appState from '@/reducers/__stubs__/app-state'
import { PrivateRouteWrapper, handleSetTermsAcceptFromCookie } from '../private-route-wrapper'
import { selectLoginSession, selectRefreshSession } from '@/selector/auth'
import { getTokenFromQueryString, redirectToOAuth, RefreshParams } from '@reapit/cognito-auth'
import { getAuthRoute } from '@/utils/auth-route'
import { authSetRefreshSession, setInitClientTermsAcceptedStateFromCookie } from '@/actions/auth'

const locationMock = { search: '?state=CLIENT', pathname: '/test' }
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
  getDefaultRoute: jest.fn(() => 'login-type-route'),
  getAuthRoute: jest.fn(() => 'auth-route'),
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
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => appState.auth.loginSession)
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => appState.auth.refreshSession)
    ;(useLocation as jest.Mocked<any>).mockImplementationOnce(() => ({ ...locationMock, pathname: '/' }))
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
    expect(useLocation).toHaveBeenCalled()
    expect(getTokenFromQueryString).toHaveBeenCalledWith(
      locationMock.search,
      window.reapit.config.cognitoClientId,
      'CLIENT',
      'login-type-route',
    )
  })

  it('should call correct functions with refreshParams && !hasSession case', () => {
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
    ;(useLocation as jest.Mocked<any>).mockImplementationOnce(() => ({ ...locationMock, pathname: '/' }))
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => appState.auth.loginSession)
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => appState.auth.refreshSession)
    mount(
      <Provider store={store}>
        <MemoryRouter>
          <PrivateRouteWrapper path="/" />
        </MemoryRouter>
      </Provider>,
    )
    expect(getAuthRoute).toHaveBeenCalled()
  })

  it('should call correct functions with !hasSession case', () => {
    // mock useSelector to return loginSession & refreshSession as null
    ;(useLocation as jest.Mocked<any>).mockImplementationOnce(() => ({ ...locationMock, pathname: '/test' }))
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => null)
    ;(useSelector as jest.Mocked<any>).mockImplementationOnce(() => null)
    ;(getTokenFromQueryString as jest.Mocked<any>).mockImplementationOnce(() => null),
      mount(
        <Provider store={store}>
          <MemoryRouter>
            <PrivateRouteWrapper path="/" />
          </MemoryRouter>
        </Provider>,
      )
    expect(redirectToOAuth).toHaveBeenCalledWith(window.reapit.config.cognitoClientId, 'login-type-route')
  })
})

describe('handleSetTermsAcceptFromCookie', () => {
  it('should call 2 dispatch with correct params', () => {
    const fn = handleSetTermsAcceptFromCookie({
      dispatch,
      setInitClientTermsAcceptedStateFromCookie,
    })
    fn()
    expect(dispatch).toHaveBeenCalledWith(setInitClientTermsAcceptedStateFromCookie())
  })
})
