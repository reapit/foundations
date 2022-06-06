import React from 'react'
import { createBrowserHistory, History } from 'history'
import { Route, Router } from 'react-router-dom'
import { PrivateRouteWrapper } from '../private-route-wrapper'
import { getMockRouterProps } from '../__mocks__/mock-router'
import { render } from '../../tests/react-testing'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {},
    connectInternalRedirect: '',
  }),
}))

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({
    location: 'location',
  })),
}))

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    const props = {
      path: '/client/apps',
      ...getMockRouterProps({ params: {}, search: '?username=wmcvay@reapit.com&desktopToken=TOKEN' }),
    }
    const history: History<any> = createBrowserHistory()
    const wrapper = render(
      <Router history={history}>
        <Route>
          <PrivateRouteWrapper {...props}>
            <div>mock children</div>
          </PrivateRouteWrapper>
        </Route>
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot', () => {
    const props = {
      path: '/client/apps',
      ...getMockRouterProps({ params: {}, search: '?username=wmcvay@reapit.com&desktopToken=TOKEN' }),
    }
    const wrapper = render(
      <PrivateRouteWrapper {...props}>
        <div>mock children</div>
      </PrivateRouteWrapper>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
