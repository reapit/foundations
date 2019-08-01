import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Menu from '@/components/ui/menu'
import Loader from '@/components/ui/loader'
import pageContainerStyles from '../styles/pages/page-container.scss?mod'
import Routes from '../constants/routes'

const { Suspense } = React

export interface PrivateRouteWrapperConnectProps {
  isLogin: boolean
}

export type PrivateRouteWrapperProps = PrivateRouteWrapperConnectProps & {
  path: string
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children, isLogin }) => {
  if (!isLogin) {
    return <Redirect to={Routes.LOGIN} />
  }

  const { menuContainer, pageContainer, pageWrapper } = pageContainerStyles

  return (
    <div className={pageWrapper}>
      <div className={menuContainer}>
        <Menu />
      </div>
      <main className={pageContainer}>
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

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectProps => ({
  isLogin: state.auth.isLogin
})

export default connect(mapStateToProps)(PrivateRouteWrapper)
