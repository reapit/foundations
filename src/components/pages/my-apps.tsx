import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { ReduxState } from '@/types/core'
import { MyAppsState } from '@/reducers/my-apps'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import Pagination from '@/components/ui/pagination'
import routes from '@/constants/routes'
import { oc } from 'ts-optchain'
import AppList from '@/components/ui/app-list'

export interface MyAppsMappedActions {}

export interface MyAppsMappedProps {
  myAppsState: MyAppsState
}

export type MyAppsProps = MyAppsMappedActions & MyAppsMappedProps & RouteComponentProps<{ page?: any }>

export const MyApps: React.FunctionComponent<MyAppsProps> = ({ myAppsState, match }) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 1
  const unfetched = !myAppsState.myAppsData
  const loading = myAppsState.loading
  const list = oc<MyAppsState>(myAppsState).myAppsData.data.data([])
  const { totalCount, pageSize } = oc<MyAppsState>(myAppsState).myAppsData.data({})

  if (unfetched && loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <AppList list={list} loading={loading} />
      <Pagination baseUrl={routes.MY_APPS} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): MyAppsMappedProps => ({
  myAppsState: state.myApps
})

const mapDispatchToProps = (dispatch: any): MyAppsMappedActions => ({})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(MyApps)
)
