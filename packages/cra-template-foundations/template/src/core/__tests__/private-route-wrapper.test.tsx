import * as React from 'react'
import { shallow } from 'enzyme'
import { PrivateRouteWrapper } from '../private-route-wrapper'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({ pathname: '/test' })),
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
    expect(shallow(<PrivateRouteWrapper />)).toMatchSnapshot()
  })
})
