import * as React from 'react'
import { Route, RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import RouteFetcher from '../components/hocs/route-fetcher'
import Navbar from '@/components/ui/navbar/navbar'
import { FlexContainerBasic } from '@reapit/elements'
import styles from '@/styles/index.scss?mod'

export type LoginType = 'CLIENT' | 'DEVELOPER'

export interface PrivateRouteConnectProps {
  loginType: LoginType
}

export interface PrivateRouteProps extends PrivateRouteConnectProps {
  allow: LoginType | LoginType[]
  component: React.FunctionComponent
  exact?: boolean
  fetcher?: boolean
}

export const PrivateRoute = ({
  component,
  allow,
  fetcher = false,
  loginType,
  ...rest
}: PrivateRouteProps & RouteProps) => {
  const allowTypes = Array.isArray(allow) ? allow : [allow]
  allowTypes.includes(loginType)
  return (
    <Route
      {...rest}
      render={props => {
        if (!allowTypes.includes(loginType)) {
          return <Redirect to="/404" />
        }

        const Component = component

        return (
          <div className={styles.contentContainer}>
            <FlexContainerBasic flexColumn>
              <Navbar />
              {fetcher ? <RouteFetcher routerProps={props} Component={component} /> : <Component />}
            </FlexContainerBasic>
          </div>
        )
      }}
    />
  )
}

const mapStateToProps = (): PrivateRouteConnectProps => ({
  loginType: 'CLIENT'
})
export default connect(mapStateToProps)(PrivateRoute)
