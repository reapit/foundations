import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { StaticContext } from 'react-router'
import routeDispatcher from '../../utils/route-dispatcher'
import { RouteValue } from '../../types/core'

interface RouteFetcherProps {
  routerProps: RouteComponentProps<any, StaticContext, any>
  Component: React.FunctionComponent
}

const RouteFetcher: React.FunctionComponent<RouteFetcherProps> = ({ routerProps, Component }: RouteFetcherProps) => {
  routeDispatcher(routerProps.match.path as RouteValue, routerProps.match.params)
  return <Component />
}

export default RouteFetcher
