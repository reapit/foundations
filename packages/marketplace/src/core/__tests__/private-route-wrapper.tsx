import * as React from 'react'
import { shallow } from 'enzyme'
import appState from '@/reducers/__stubs__/app-state'
import { PrivateRouteWrapper, handleSetTermsAcceptFromCookie } from '../private-route-wrapper'
import { RefreshParams } from '@reapit/cognito-auth'
import { setInitClientTermsAcceptedStateFromCookie } from '@/actions/auth'

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
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(<PrivateRouteWrapper path="/" />)
    expect(wrapper).toMatchSnapshot()
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
