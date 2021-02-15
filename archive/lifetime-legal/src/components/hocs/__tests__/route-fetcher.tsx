import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import RouteFetcher from '../route-fetcher'
import Routes from '../../../constants/routes'
import { RouteComponentProps, StaticContext } from 'react-router'
import routeDispatcher from '../../../utils/route-dispatcher'

jest.mock('../../../utils/route-dispatcher')

const MockComponent = () => <div>I am a component!</div>

const props = {
  Component: MockComponent,
  routerProps: {
    match: {
      path: Routes.HOME,
      params: { page: 1 },
    },
  } as RouteComponentProps<any, StaticContext, any>,
}

describe('RouteFetcher', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<RouteFetcher {...props} />))).toMatchSnapshot()
  })

  it('should call the routeDispatcher with the route path', () => {
    shallow(<RouteFetcher {...props} />)
    expect(routeDispatcher).toHaveBeenCalledTimes(1)
    expect(routeDispatcher).toHaveBeenCalledWith(props.routerProps.match.path, props.routerProps.match.params)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
