import { useReapitConnect } from '@reapit/connect-session'
import React from 'react'
import { render } from '../../tests/react-testing'
import { PrivateRouteWrapper } from '../private-route-wrapper'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        groups: [],
      },
    },
  })),
}))

const mockUseReapitConnect = useReapitConnect as jest.Mock

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <PrivateRouteWrapper>
          <div />
        </PrivateRouteWrapper>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot if an employee', () => {
    mockUseReapitConnect.mockReturnValueOnce({
      connectSession: {
        loginIdentity: {
          groups: ['ReapitEmployee'],
        },
      },
    })

    expect(
      render(
        <PrivateRouteWrapper>
          <div />
        </PrivateRouteWrapper>,
      ),
    ).toMatchSnapshot()
  })
})
