import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { MyAppsState } from '@/reducers/my-apps'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import AppCard from '../ui/app-card'
import bulma from '@/styles/vendor/bulma'
import bulmaUtils from '../../styles/vendor/bulma-utils'

export interface MyAppsMappedActions {}

export interface MyAppsMappedProps {
  myAppsState: MyAppsState
}

export type MyAppsProps = MyAppsMappedActions & MyAppsMappedProps

const { container, columns, isMultiLine } = bulma
const { isResponsiveColumn } = bulmaUtils

export const MyApps: React.FunctionComponent<MyAppsProps> = ({ myAppsState }) => (
  <div className={container}>
    {myAppsState.loading ? (
      <Loader />
    ) : (
      <ErrorBoundary>
        <div className={`${columns} ${isMultiLine}`}>
          {myAppsState.myAppsData &&
            myAppsState.myAppsData.data.map((child, index) => (
              <div className={`${isResponsiveColumn}`} key={child.id}>
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
