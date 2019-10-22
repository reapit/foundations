import * as React from 'react'
import { Route, RouteProps } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import RouteFetcher from '../components/hocs/route-fetcher'
import Navbar from '@/components/ui/navbar/navbar'
import { FlexContainerBasic, LoginMode } from '@reapit/elements'
import styles from '@/styles/index.scss?mod'
import Routes from '@/constants/routes'
import { ReduxState } from '../../../aml-checklist/src/types/core'
import { oc } from 'ts-optchain'

export type LoginType = 'CLIENT' | 'DEVELOPER'

export interface PrivateRouteConnectProps {
  loginType: LoginType
  loginMode: LoginMode
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
  loginMode,
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

        const searchParams = new URLSearchParams(props.location.search)
        const cncCode = searchParams && searchParams.get('cncCode') ? searchParams.get('cncCode') : null

        if (cncCode) {
          return <Redirect to={`${Routes.PROFILE}/${cncCode}`} />
        }

        const Component = component

        return (
          <div className={`${styles.contentContainer} ${loginMode === 'DESKTOP' ? styles.isDesktop : ''}`}>
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

const mapStateToProps = (state: ReduxState): PrivateRouteConnectProps => ({
  loginType: 'CLIENT',
  loginMode: oc(state).auth.refreshSession.mode('WEB')
})
export default connect(mapStateToProps)(PrivateRoute)
