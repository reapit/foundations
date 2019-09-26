import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ReduxState } from '@/types/core'
import { Loader, RefreshParams, getTokenFromQueryString } from '@reapit/elements'
import Menu from '@/components/ui/menu'
import Routes from '@/constants/routes'
import { selectUserLoginStatus } from '@/selectors/auth'
import pageContainerStyles from '../styles/pages/page-container.scss?mod'
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

  const { menuContainer, pageContainer, pageWrapper, isDesktop } = pageContainerStyles

  return (
    <div className={pageWrapper}>
      <div className={`${menuContainer} ${isDesktopMode ? isDesktop : ''}`}>
        <Menu />
      </div>
      <main className={`${pageContainer} ${isDesktopMode ? isDesktop : ''}`}>
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
