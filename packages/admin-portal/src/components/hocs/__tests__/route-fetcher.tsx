import * as React from 'react'
import { shallow, mount } from 'enzyme'
import RouteFetcher from '../route-fetcher'
import Routes from '../../../constants/routes'
import { RouteComponentProps, StaticContext } from 'react-router'
import routeDispatcher from '../../../utils/route-dispatcher'

jest.mock('../../../utils/route-dispatcher')

const Component = () => <div>I am a component!</div>
const props = {
  Component,
  routerProps: {
    match: {
      path: Routes.APPS,
      params: { page: 1 },
    },
    location: {
      search: 'page=1',
    },
  } as RouteComponentProps<any, StaticContext, any>,
}

describe('RouteFetcher', () => {
  beforeAll(() => {
    jest.spyOn(React, 'useEffect').mockImplementation(React.useLayoutEffect)
  })

  it('should match a snapshot', () => {
    expect(shallow(<RouteFetcher {...props} />)).toMatchSnapshot()
  })

  it('should call the routeDispatcher with the route path', () => {
    mount(<RouteFetcher {...props} />)
    expect(routeDispatcher).toHaveBeenCalledTimes(1)
    expect(routeDispatcher).toHaveBeenCalledWith(
      props.routerProps.match.path,
      props.routerProps.match.params,
      props.routerProps.location.search,
    )
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
  afterAll(() => (React.useEffect as jest.Mock).mockRestore())
})
