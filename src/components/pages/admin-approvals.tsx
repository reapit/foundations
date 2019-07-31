import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AdminApprovalsState } from '@/reducers/admin-approvals'
import Loader from '@/components/ui/loader'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import { oc } from 'ts-optchain'
import Pagination from '@/components/ui/pagination'
import routes from '@/constants/routes'
import { AppDetailState } from '@/reducers/app-detail'
import bulma from '@/styles/vendor/bulma'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'

export interface AdminApprovalsMappedActions {}

export interface AdminApprovalsMappedProps {
  approvalsState: AdminApprovalsState
  appDetail: AppDetailState
}

export type AdminApprovalsProps = AdminApprovalsMappedActions &
  AdminApprovalsMappedProps &
  RouteComponentProps<{ page?: any }>

export const AdminApprovals: React.FunctionComponent<AdminApprovalsProps> = ({ approvalsState, match }) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 1
  const unfetched = !approvalsState.adminApprovalsData
  const loading = approvalsState.loading
  const list = oc<AdminApprovalsState>(approvalsState).adminApprovalsData.data.data([])
  const { totalCount, pageSize } = oc<AdminApprovalsState>(approvalsState).adminApprovalsData.data({})

  if (unfetched && loading) {
    return <Loader />
  }
  return (
    <ErrorBoundary>
      <div className={`${bulma.container} ${bulma.isRelative} py-8`} data-test="app-list-container">
        <table className={`${bulma.table} ${bulma.isFullwidth}`}>
          <thead>
            <tr>
              <th>#</th>
              <th>AppId</th>
              <th>Type</th>
              <th>Description</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {list.map((revision, index) => (
              <tr key={revision.appRevisionId}>
                <th>{(pageNumber - 1) * REVISIONS_PER_PAGE + index + 1}</th>
                <th>{revision.appId}</th>
                <th>{revision.type}</th>
                <th>{revision.description}</th>
                <th>
                  <button className={`${bulma.button} ${bulma.isPrimary} mr-2`}>View details</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          baseUrl={routes.ADMIN_APPROVALS}
          totalCount={totalCount}
          pageSize={pageSize}
          pageNumber={pageNumber}
        />
      </div>
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): AdminApprovalsMappedProps => ({
  approvalsState: state.adminApprovals,
  appDetail: state.appDetail
})

const mapDispatchToProps = (dispatch: any): AdminApprovalsMappedActions => ({})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminApprovals)
)
