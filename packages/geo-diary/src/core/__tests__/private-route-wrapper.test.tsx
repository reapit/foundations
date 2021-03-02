import React from 'react'
import { createBrowserHistory } from 'history'
import { Route, Router } from 'react-router-dom'
import { handleUseEffect, PrivateRouteWrapper, PrivateRouteWrapperProps } from '../private-route-wrapper'
import { getMockRouterProps } from '../__mocks__/mock-router'
import { shallow } from 'enzyme'

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
    const props: PrivateRouteWrapperProps = {
      path: '/client/apps',
      ...getMockRouterProps({ params: {}, search: '?username=wmcvay@reapit.com&desktopToken=TOKEN' }),
    }
    const history = createBrowserHistory()
    const wrapper = shallow(
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
    const wrapper = shallow(
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
