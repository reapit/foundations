import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { HomeState } from '@/reducers/home'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import AMLProgressBar from '@/components/ui/aml-progressbar'
import PrimaryIdentification from './components/primary-identification'
import SecondaryIdentification from './components/secondary-identification'
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
      <div className="mb-5">
        <AMLProgressBar title="Giacomo" />
      </div>

      <PrimaryIdentification
        onNextHandler={() => {
          console.log('handler')
        }}
        onPrevHandler={() => {
          console.log('handler')
        }}
      />
      <SecondaryIdentification
        onNextHandler={() => {
          console.log('handler')
        }}
        onPrevHandler={() => {
          console.log('handler')
        }}
      />
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
