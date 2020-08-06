import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'
import { getMockRouterProps } from '../__mocks__/mock-router'

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
  it('should match a snapshot', () => {
    const props: PrivateRouteWrapperProps = {
      path: '/client/apps',
      ...getMockRouterProps({ params: {}, search: '?username=wmcvay@reapit.com&desktopToken=TOKEN' }),
    }
    const wrapper = render(<PrivateRouteWrapper {...props} />)
    expect(wrapper).toMatchSnapshot()
  })
})
