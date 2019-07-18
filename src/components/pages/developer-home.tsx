import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { DeveloperState } from '@/reducers/developer'
import Pagination from '@/components/ui/pagination'
import routes from '@/constants/routes'
import { oc } from 'ts-optchain'
import AppList from '@/components/ui/app-list'
import { withRouter, RouteComponentProps } from 'react-router'

export interface DeveloperMappedActions {}

export interface DeveloperMappedProps {
  developerState: DeveloperState
}

export type DeveloperProps = DeveloperMappedActions & DeveloperMappedProps & RouteComponentProps<{ page?: any }>

export const DeveloperHome: React.FunctionComponent<DeveloperProps> = ({ developerState, match }) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 9999
  const unfetched = !developerState.developerData
  const loading = developerState.loading
  const list = oc<DeveloperState>(developerState).developerData.data.data([])
  const { totalCount, pageSize } = oc<DeveloperState>(developerState).developerData.data({})

  if (unfetched && loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <AppList list={list} loading={loading} />
      <Pagination
        baseUrl={routes.DEVELOPER_MY_APPS}
        totalCount={totalCount}
        pageSize={pageSize}
        pageNumber={pageNumber}
      />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): DeveloperMappedProps => ({
  developerState: state.developer
})

const mapDispatchToProps = (dispatch: any): DeveloperMappedActions => ({})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DeveloperHome)
)
