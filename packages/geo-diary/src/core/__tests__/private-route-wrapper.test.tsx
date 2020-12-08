import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { handleUseEffect, PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'
import { getMockRouterProps } from '../__mocks__/mock-router'

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {},
    connectInternalRedirect: '',
  }),
}))

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: jest.fn(() => ({
    location: 'location',
  })),
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
          <PrivateRouteWrapper {...props}>
            <div>mock children</div>
          </PrivateRouteWrapper>
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
    const wrapper = render(
      <PrivateRouteWrapper {...props}>
        <div>mock children</div>
      </PrivateRouteWrapper>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const mockProps = {
        queryParams: {},
        history: getMockRouterProps({ params: '', search: '' }).history,
      }
      const fn = handleUseEffect(mockProps)
      fn()
      expect(mockProps.history.push).not.toBeCalled()
    })
  })
})
