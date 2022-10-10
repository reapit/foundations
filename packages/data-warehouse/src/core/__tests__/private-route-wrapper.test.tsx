import React from 'react'
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

describe('PrivateRouteWrapper', () => {
  it('should match a snapshot', () => {
    expect(render(<PrivateRouteWrapper />)).toMatchSnapshot()
  })

  it('should match a snapshot for root path', () => {
    window.location.pathname = '/'
    expect(render(<PrivateRouteWrapper />)).toMatchSnapshot()
  })
})
