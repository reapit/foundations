import React, { useEffect, LazyExoticComponent, FC } from 'react'
import { History } from 'history'
import { Route, RouteProps, useHistory } from 'react-router'
import Routes from '@/constants/routes'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { selectIsCustomer } from '../selector/auth'

export interface PrivateRouteProps {
  component: FC | LazyExoticComponent<any>
  exact?: boolean
}

export const handleRedirectRegistraitionPage =
  (history: History, connectSession: ReapitConnectSession | null) => () => {
    const developerId = connectSession?.loginIdentity?.developerId
    const isCustomer = selectIsCustomer(connectSession)

    if (developerId || !connectSession) return

    if (!isCustomer) {
      return history.push(Routes.SELECT_ROLE)
    }

    history.push(`${Routes.CUSTOMER_REGISTER}`)
  }

export const PrivateRoute = ({ component, ...rest }: PrivateRouteProps & RouteProps) => {
  const history = useHistory()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  useEffect(handleRedirectRegistraitionPage(history, connectSession), [connectSession, history])

  return (
    <Route
      {...rest}
      render={() => {
        const Component = component

        return <Component />
      }}
    />
  )
}

export default PrivateRoute
