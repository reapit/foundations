import * as React from 'react'
import { LoadableComponent } from '@loadable/component'
import { RouteComponentProps } from 'react-router-dom'
import { StaticContext } from 'react-router'
import routeDispatcher from '../../utils/route-dispatcher'
import { RouteValue } from '../../types/core'

interface RouteFetcherProps {
  routerProps: RouteComponentProps<any, StaticContext, any>
  Component: LoadableComponent<any> | React.FunctionComponent
}

const RouteFetcher: React.FunctionComponent<RouteFetcherProps> = ({ routerProps, Component }) => {
  routeDispatcher(routerProps.match.path as RouteValue)
  return <Component />
}

export default RouteFetcher
