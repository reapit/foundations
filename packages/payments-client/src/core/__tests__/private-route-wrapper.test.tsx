import * as React from 'react'
import { render } from '../../tests/react-testing'
import { PrivateRouteWrapper } from '../private-route-wrapper'

const locationMock = { pathname: '/test' }

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => locationMock),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {},
    connectInternalRedirect: '',
  }),
}))

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(render(<PrivateRouteWrapper />)).toMatchSnapshot()
  })
})
