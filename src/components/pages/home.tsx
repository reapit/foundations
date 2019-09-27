import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { HomeState } from '@/reducers/home'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import styles from '@/styles/pages/home.scss?mod'
import { Dispatch } from 'redux'
import { authLogout } from '@/actions/auth'

export interface HomeMappedActions {}

export interface HomeMappedProps {
  homeState: HomeState
}

export type HomeProps = HomeMappedActions &
  HomeMappedProps &
  RouteComponentProps<{ page?: any }> & {
    logout: () => void
  }

export const Home: React.FunctionComponent<HomeProps> = ({ logout }) => {
  return (
    <ErrorBoundary>
      <div className={styles.topNavbar}>
        <div onClick={logout}>
          <a>Back to Client/Logout</a>
        </div>
        <div>
          <a>Customise Form</a>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  homeState: state.home
})

export const mapDispatchToProps = (dispatch: Dispatch): HomeMappedActions => ({
  logout: () => dispatch(authLogout())
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
) as any
