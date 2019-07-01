import * as React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { ReduxState } from 'src/types/core'
import Header from '@/components/ui/header'
import Loader from '@/components/ui/loader'

const { Suspense } = React

export interface PrivateRouteWrapperConnectProps {
  isLogin: boolean
}

export type PrivateRouteWrapperProps = PrivateRouteWrapperConnectProps & {
  path: string
}

export const PrivateRouteWrapper: React.FunctionComponent<PrivateRouteWrapperProps> = ({ children, isLogin }) => {
  if (!isLogin) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <main className="main">
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
    </>
  )
}

const mapStateToProps = (state: ReduxState): PrivateRouteWrapperConnectProps => ({
  isLogin: state.auth.isLogin
})

export default connect(mapStateToProps)(PrivateRouteWrapper)
