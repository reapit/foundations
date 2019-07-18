import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { DeveloperState } from '@/reducers/developer'
import AppCard from '@/components/ui/app-card'
import bulma from '../../styles/vendor/bulma'
import bulmaUtils from '../../styles/vendor/bulma-utils'

export interface DeveloperHomeMappedProps {
  developerState: DeveloperState
}

export type DeveloperHomeProps = DeveloperHomeMappedProps

const { container, columns, isMultiLine } = bulma
const { isResponsiveColumn } = bulmaUtils

export const DeveloperHome: React.FunctionComponent<DeveloperHomeProps> = ({ developerState }) => (
  <div data-test="developer-home-container" className={container}>
    {developerState.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary>
        <div className={`${columns} ${isMultiLine}`}>
          {developerState.developerData &&
            developerState.developerData.data.map(child => (
              <div className={`${isResponsiveColumn}`} key={child.id}>
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
