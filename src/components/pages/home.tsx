import * as React from 'react'
import CurrentLocButton from '@/components/container/current-loc-button'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { HomeState } from '@/reducers/home'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'

export interface HomeMappedActions {}

export interface HomeMappedProps {
  homeState: HomeState
}

export type HomeProps = HomeMappedActions & HomeMappedProps & RouteComponentProps<{ page?: any }>

export const Home: React.FunctionComponent<HomeProps> = () => {
  return (
    <ErrorBoundary>
      <h1>Home Page</h1>
      <CurrentLocButton />
      <CurrentLocButton>
        {({ buttonOnClick, isDisableCurrentLocButton }) => (
          <button className="test" disabled={isDisableCurrentLocButton} onClick={buttonOnClick}>
            Test Button
          </button>
        )}
      </CurrentLocButton>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): HomeMappedProps => ({
  homeState: state.home
})

const mapDispatchToProps = (dispatch: any): HomeMappedActions => ({})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)
