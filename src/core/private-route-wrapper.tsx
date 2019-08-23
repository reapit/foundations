import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import pageContainerStyles from '../styles/pages/page-container.scss?mod'
import Routes from '../constants/routes'
import { RefreshParams, Loader } from '@reapit/elements'
import { getTokenFromQueryString } from '../utils/session'
import { authSetDesktopSession } from '../actions/auth'
import { Dispatch } from 'redux'
import { withRouter } from 'react-router'

const { Suspense } = React

export interface PrivateRouteWrapperConnectActions {
  setDesktopSession: (refreshParams: RefreshParams) => void
}

export interface PrivateRouteWrapperConnectState {
  isLogin: boolean
  isDesktopLogin: boolean
}

export type PrivateRouteWrapperProps = PrivateRouteWrapperConnectState &
  PrivateRouteWrapperConnectActions &
  RouteComponentProps & {
    path: string
  }

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({
  setDesktopSession,
  children,
  isLogin,
  location,
  isDesktopLogin
}) => {
  const desktopLogin = getTokenFromQueryString(location.search)

  if (!isLogin && !desktopLogin && !isDesktopLogin) {
    return <Redirect to={Routes.LOGIN} />
  }

  if (desktopLogin && !isDesktopLogin) {
    setDesktopSession(desktopLogin)
  }

  const { menuContainer, pageContainer, pageWrapper, isDesktop } = pageContainerStyles

  return (
    <div className={pageWrapper}>
      <div className={`${menuContainer} ${desktopLogin || isDesktopLogin ? isDesktop : ''}`}>
        <Menu />
      </div>
      <main className={`${pageContainer} ${desktopLogin || isDesktopLogin ? isDesktop : ''}`}>
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
  isLogin: state.auth.isLogin,
  isDesktopLogin: !!state.auth.desktopSession
})

const mapDispatchToProps = (dispatch: Dispatch): PrivateRouteWrapperConnectActions => ({
  setDesktopSession: refreshParams => dispatch(authSetDesktopSession(refreshParams))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrivateRouteWrapper)
)
