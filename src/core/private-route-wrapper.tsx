import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import Routes from '../constants/routes'
import {
  LoginType,
  RefreshParams,
  Loader,
  getTokenFromQueryString,
  Section,
  FlexContainerBasic,
  AppNavContainer
} from '@reapit/elements'
import { Dispatch } from 'redux'
import { withRouter } from 'react-router'
import { authSetRefreshSession } from '../actions/auth'
import { getAuthRouteByLoginType } from '@/utils/auth-route'

const { Suspense } = React

export interface PrivateRouteWrapperConnectActions {
  setRefreshSession: (refreshParams: RefreshParams) => void
}

export interface PrivateRouteWrapperConnectState {
  hasSession: boolean
  isDesktopMode: boolean
  loginType: LoginType
}

export type PrivateRouteWrapperProps = PrivateRouteWrapperConnectState &
  PrivateRouteWrapperConnectActions &
  RouteComponentProps & {
    path: string
  }

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  setRefreshSession,
  children,
  hasSession,
  loginType,
  location,
  isDesktopMode
}) => {
  const desktopToken = getTokenFromQueryString(location.search)

  if (desktopToken && !isDesktopMode) {
    setRefreshSession(desktopToken)
    return null
  }

  if (!hasSession) {
    const route = getAuthRouteByLoginType(loginType)
    console.log('no session, route', route)
    return <Redirect to={route} />
  }

  return (
    <AppNavContainer>
      <Menu />
      <FlexContainerBasic hasPadding={location.pathname !== Routes.DEVELOPER_ELEMENTS} isScrollable flexColumn>
        <Suspense
          fallback={
            <Section>
              <Loader />
            </Section>
          }
        >
          {children}
        </Suspense>
      </FlexContainerBasic>
    </AppNavContainer>
  )
}

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  loginType: state?.auth?.loginSession?.loginType || 'CLIENT',
  isDesktopMode: state?.auth?.refreshSession?.mode === 'DESKTOP'
})

const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWrapper))
