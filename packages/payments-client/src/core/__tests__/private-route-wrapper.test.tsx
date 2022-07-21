import React from 'react'
import { render } from '../../tests/react-testing'
import { PrivateRouteWrapper } from '../private-route-wrapper'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {},
    connectInternalRedirect: '',
  }),
}))

describe('PrivateRouter', () => {
  window.location.pathname = '/foo'
  it('should match a snapshot', () => {
    expect(
      render(
        <PrivateRouteWrapper>
          <div />
        </PrivateRouteWrapper>,
      ),
    ).toMatchSnapshot()
  })
})
