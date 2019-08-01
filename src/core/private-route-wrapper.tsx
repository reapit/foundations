import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import Loader from '@/components/ui/loader'
import pageContainerStyles from '../styles/pages/page-container.scss?mod'
import Routes from '../constants/routes'
import { RefreshParams } from '../utils/cognito'
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
  location
}) => {
  const desktopLogin = getTokenFromQueryString(location.search)
  if (!isLogin) {
    if (!desktopLogin) {
      return <Redirect to={Routes.LOGIN} />
    }
    setDesktopSession(desktopLogin)
  }

  const { menuContainer, pageContainer, pageWrapper, isDesktop } = pageContainerStyles

  return (
    <div className={pageWrapper}>
      <div className={`${menuContainer} ${desktopLogin ? isDesktop : ''}`}>
        <Menu />
      </div>
      <main className={`${pageContainer} ${desktopLogin ? isDesktop : ''}`}>
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
  isLogin: state.auth.isLogin
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
