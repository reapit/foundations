import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { DeveloperState } from '@/reducers/developer'
import AppCard from '@/components/ui/app-card'

export interface DeveloperHomeMappedProps {
  developerState: DeveloperState
}

export type DeveloperHomeProps = DeveloperHomeMappedProps

export const DeveloperHome: React.FunctionComponent<DeveloperHomeProps> = ({ developerState }) => (
  <div className="container pt-5">
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
)

const mapStateToProps = (state: ReduxState): DeveloperHomeMappedProps => ({
  developerState: state.developer
})

export default connect(mapStateToProps)(DeveloperHome)
