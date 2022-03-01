import * as React from 'react'
import { render } from '@testing-library/react'
import { PrivateRouteWrapper } from '../private-route-wrapper'
import { ReapitConnectBrowserSession } from '@reapit/connect-session'

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
    const { asFragment } = render(
      <PrivateRouteWrapper
        reapitConnectBrowserSession={
          new ReapitConnectBrowserSession({
            connectClientId: '',
            connectOAuthUrl: '',
            connectUserPoolId: '',
          })
        }
      />,
    )
    expect(asFragment()).toMatchSnapshot()
  })
})
