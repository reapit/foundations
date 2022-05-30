import * as React from 'react'
import { render } from '../../../tests/react-testing'
import RouteFetcher from '../route-fetcher'
import Routes from '@/constants/routes'
import { RouteComponentProps, StaticContext } from 'react-router'
import routeDispatcher from '@/utils/route-dispatcher'

jest.mock('@/utils/route-dispatcher')
jest.mock('@reapit/elements')

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
  it('should match a snapshot', () => {
    expect(render(<RouteFetcher {...props} />)).toMatchSnapshot()
  })

  it('should call the routeDispatcher with the route path', () => {
    render(<RouteFetcher {...props} />)
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
})
