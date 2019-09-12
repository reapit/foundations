import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { ReduxState } from '@/types/core'
import { Loader } from '@reapit/elements'
import Menu from '@/components/ui/menu'
import Routes from '@/constants/routes'
import { selectUserLoginStatus } from '@/selectors/auth'
import pageContainerStyles from '../styles/pages/page-container.scss?mod'

const { Suspense } = React

export interface PrivateRouteWrapperConnectActions {}

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
  children,
  isLogin,
  isDesktopLogin
}) => {
  const desktopLogin = false

  if (!isLogin && !desktopLogin && !isDesktopLogin) {
    return <Redirect to={Routes.LOGIN} />
  }

  if (desktopLogin && !isDesktopLogin) {
    console.log('Desktop session')
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
  isLogin: selectUserLoginStatus(state),
  isDesktopLogin: false
})

const mapDispatchToProps = (): PrivateRouteWrapperConnectActions => ({})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrivateRouteWrapper)
)
