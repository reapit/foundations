import * as React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { StaticContext } from 'react-router'
import Navbar from '@/components/ui/navbar/navbar'
import routeDispatcher from '../../utils/route-dispatcher'
import { RouteValue } from '../../types/core'

interface RouteFetcherProps {
  routerProps: RouteComponentProps<any, StaticContext, any>
  Component: React.FunctionComponent
}

const RouteFetcher: React.FunctionComponent<RouteFetcherProps> = ({ routerProps, Component }) => {
  routeDispatcher(routerProps.match.path as RouteValue, routerProps.match.params)
  return (
    <div>
      <Navbar
        logout={() => {
          console.log('logout callback')
        }}
      />
      <Component />
    </div>
  )
}

export default RouteFetcher
