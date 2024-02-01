import React from 'react'
import { PrivateRouteWrapper } from '../private-route-wrapper'
import { createBrowserHistory, History } from 'history'
import { render } from '../../tests/react-testing'

jest.mock('../../components/ui/nav/nav', () => ({ Nav: () => <div /> }))

export const history: History = createBrowserHistory()

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

describe('PrivateRouteWrapper', () => {
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
