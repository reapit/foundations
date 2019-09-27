import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Routes from '../constants/routes'
import { ReduxState } from '@/types/core'
import { selectUserLoginStatus } from '@/selectors/auth'
import { Loader, RefreshParams, getTokenFromQueryString } from '@reapit/elements'
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
    <main>
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </main>
  )
}

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: selectUserLoginStatus(state),
  isDesktopMode: false
})

const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setRefreshSession: refreshParams => dispatch(authSetRefreshSession(refreshParams))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrivateRouteWrapper)
)
