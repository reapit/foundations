import React from 'react'
import { render } from '@testing-library/react'
import { PrivateRouteWrapper } from '../private-route-wrapper'
import { MediaStateProvider, NavStateProvider } from '@reapit/elements'
import { Router, Switch } from 'react-router-dom'
import { createBrowserHistory, History } from 'history'

jest.mock('../../components/ui/nav/nav', () => ({ Nav: () => <div /> }))

export const history: History<any> = createBrowserHistory()

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
        <Router history={history}>
          <Switch>
            <NavStateProvider>
              <MediaStateProvider>
                <PrivateRouteWrapper>
                  <div />
                </PrivateRouteWrapper>
              </MediaStateProvider>
            </NavStateProvider>
          </Switch>
        </Router>,
      ),
    ).toMatchSnapshot()
  })
})
