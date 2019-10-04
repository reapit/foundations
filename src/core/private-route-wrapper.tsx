import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import pageContainerStyles from '../styles/pages/page-container.scss?mod'
import Routes from '../constants/routes'
import { RefreshParams, Loader, getTokenFromQueryString } from '@reapit/elements'
import { Dispatch } from 'redux'
import { withRouter } from 'react-router'
import { oc } from 'ts-optchain'
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
  setRefreshSession,
  children,
  hasSession,
  location,
  isDesktopMode
}) => {
  const desktopToken = getTokenFromQueryString(location.search)

  if (desktopToken && !isDesktopMode) {
    setRefreshSession(desktopToken)
    return null
  }

  if (!hasSession) {
    return <Redirect to={Routes.LOGIN} />
  }

  const { menuContainer, pageContainer, pageWrapper, isDesktop } = pageContainerStyles

  return (
    <div className={pageWrapper}>
      <Menu />
      <main className={`${pageContainer} `}>
        <Suspense
          fallback={
            <div className="pt-5">
              <Loader />
            </div>
          }
        >
          {children}
        </Suspense>
      </main>
    </div>
  )
}

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectState => ({
  hasSession: !!state.auth.loginSession || !!state.auth.refreshSession,
  isDesktopMode: oc(state).auth.refreshSession.mode() === 'DESKTOP'
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
