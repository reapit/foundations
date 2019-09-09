import * as React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import Menu from '@/components/ui/menu'
import pageContainerStyles from '../styles/pages/page-container.scss?mod'
import Routes from '../constants/routes'

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

  const { menuContainer, menuSticky, pageWrapper, isDesktop } = pageContainerStyles

  return (
    <div className={pageWrapper}>
      <div className={`${menuContainer} ${menuSticky} ${desktopLogin || isDesktopLogin ? isDesktop : ''}`}>
        <Menu />
      </div>
      <main>
        <Suspense fallback={<div>Loading</div>}>{children}</Suspense>
      </main>
    </div>
  )
}

const mapStateToProps = (): PrivateRouteWrapperConnectState => ({
  isLogin: true,
  isDesktopLogin: false
})

const mapDispatchToProps = (): PrivateRouteWrapperConnectActions => ({})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PrivateRouteWrapper)
)
