import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'
import { getMockRouterProps } from '../__mocks__/mock-router'

const locationMock = { pathname: '/test' }

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
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
    const props: PrivateRouteWrapperProps = {
      path: '/client/apps',
      ...getMockRouterProps({ params: {}, search: '?username=wmcvay@reapit.com&desktopToken=TOKEN' }),
    }
    const history = createBrowserHistory()
    const wrapper = render(
      <Router history={history}>
        <Route>
          <PrivateRouteWrapper {...props} />
        </Route>
      </Router>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
