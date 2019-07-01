import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { MyAppsState } from '@/reducers/my-apps'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import AppCard from '../ui/app-card'

export interface MyAppsMappedActions {}

export interface MyAppsMappedProps {
  myAppsState: MyAppsState
}

export type MyAppsProps = MyAppsMappedActions & MyAppsMappedProps

export const MyApps: React.FunctionComponent<MyAppsProps> = ({ myAppsState }) => (
  <div className="container pt-5">
    {myAppsState.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary>
        <div className="row">
          {myAppsState.myAppsData &&
            myAppsState.myAppsData.data.map(child => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={child.id}>
                <AppCard {...child} />
              </div>
            ))}
        </div>
      </ErrorBoundary>
    )}
  </div>
)

const mapStateToProps = (state: ReduxState): MyAppsMappedProps => ({
  myAppsState: state.myApps
})

const mapDispatchToProps = (dispatch: any): MyAppsMappedActions => ({})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyApps)
