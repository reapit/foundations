import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { PrivateRouteWrapper } from '../private-route-wrapper'

const locationMock = { search: '?state=CLIENT', pathname: '/test' }

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Object),
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn(() => jest.fn()),
}))

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => locationMock),
}))

jest.mock('@/utils/auth-route', () => ({
  getDefaultRoute: jest.fn(() => 'login-type-route'),
  getAuthRoute: jest.fn(() => 'auth-route'),
}))

jest.mock('@/utils/cookie', () => ({
  ...(jest.requireActual('@/utils/cookie') as Object),
  getCookieString: jest.fn(() => 'cookie-string'),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {
        developerId: 'SOME_ID',
      },
    },
    connectInternalRedirect: '',
  }),
}))

describe('PrivateRouteWrapper', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot', () => {
    const wrapper = render(<PrivateRouteWrapper path="/" />)
    expect(wrapper).toMatchSnapshot()
  })
})
