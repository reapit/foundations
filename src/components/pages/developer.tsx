import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { authLogout } from '@/actions/auth'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { DeveloperState } from '@/reducers/developer'
import AppCard from '@/components/ui/app-card'

export interface DeveloperMappedActions {
  logout: () => void
}

export interface DeveloperMappedProps {
  developerState: DeveloperState
}
export type DeveloperProps = DeveloperMappedActions & DeveloperMappedProps

export const Developer: React.FunctionComponent<DeveloperProps> = ({ logout, developerState }) => (
  <div>
    <button onClick={() => logout()}>Logout</button>
    <div className="container">
      {developerState.loading ? (
        <Loader />
      ) : (
        <ErrorBoundary>
          <div className="row">
            {developerState.developerData &&
              developerState.developerData.data.map(child => (
                <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={child.id}>
                  <AppCard {...child} />
                </div>
              ))}
          </div>
        </ErrorBoundary>
      )}
    </div>
  </div>
)

const mapStateToProps = (state: ReduxState): DeveloperMappedProps => ({
  developerState: state.developer
})

const mapDispatchToProps = (dispatch: any): DeveloperMappedActions => ({
  logout: () => dispatch(authLogout())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Developer)
