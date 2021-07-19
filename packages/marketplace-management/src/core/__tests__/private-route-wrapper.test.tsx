import * as React from 'react'
import { shallow } from 'enzyme'
import { PrivateRouteWrapper } from '../private-route-wrapper'

const mockLocation = { pathname: '/test' }

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as any),
  useLocation: jest.fn(() => mockLocation),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      loginIdentity: {
        groups: ['OrganisationAdmin'],
      },
    },
    connectInternalRedirect: '',
  }),
}))

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(shallow(<PrivateRouteWrapper />)).toMatchSnapshot()
  })
})
