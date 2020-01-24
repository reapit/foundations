import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ReduxState } from '@/types/core'
import { Loader, AppNavContainer } from '@reapit/elements'
import { RefreshParams, getTokenFromQueryString } from '@reapit/cognito-auth'
import Menu from '@/components/ui/menu'
import Routes from '@/constants/routes'
import { selectUserLoginStatus } from '@/selectors/auth'
import { Dispatch } from 'redux'
import { authSetRefreshSession } from '../actions/auth'

const { Suspense } = React

export interface PrivateRouteWrapperConnectActions {
  setRefreshSession: (refreshParams: RefreshParams) => void
}

export interface PrivateRouteWrapperConnectState {
  hasSession: boolean
  isDesktopMode: boolean
}

export type PrivateRouteWrapperProps = PrivateRouteWrapperConnectState &
  PrivateRouteWrapperConnectActions &
  RouteComponentProps & {
    path: string
  }

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  children,
  hasSession,
  isDesktopMode,
  setRefreshSession
}) => {
  const desktopLogin = getTokenFromQueryString(location.search)

  if (desktopLogin && !isDesktopMode) {
    setRefreshSession(desktopLogin)
  }

  if (!hasSession) {
    return <Redirect to={Routes.LOGIN} />
  }

  return (
    <AppNavContainer>
      <Menu />
      <Suspense fallback={<Loader body />}>{children}</Suspense>
    </AppNavContainer>
  )
}

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: selectUserLoginStatus(state),
  isDesktopMode: state?.auth?.refreshSession?.mode === 'DESKTOP'
})

const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRouteWrapper))
