import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AdminApprovalsState } from '@/reducers/admin-approvals'
import { Loader, Pagination, Table } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import { oc } from 'ts-optchain'
import routes from '@/constants/routes'
import { AppDetailState } from '@/reducers/app-detail'
import bulma from '@/styles/vendor/bulma'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { revisionDetailRequestData, RevisionDetailRequestParams } from '@/actions/revision-detail'
import AdminApprovalModal from '../ui/admin-approval-modal'
import { appDetailRequestData } from '@/actions/app-detail'
import { RevisionDetailState } from '@/reducers/revision-detail'
import Info from '../pages/info'

export interface AdminApprovalsMappedActions {
  fetchRevisionDetail: (params: RevisionDetailRequestParams) => void
  fetchAppDetail: (id: string) => void
}

export interface AdminApprovalsMappedProps {
  approvalsState: AdminApprovalsState
  appDetail: AppDetailState
  revisionDetail: RevisionDetailState
}

export type AdminApprovalsProps = AdminApprovalsMappedActions &
  AdminApprovalsMappedProps &
  RouteComponentProps<{ page?: any }>

export const AdminApprovals: React.FunctionComponent<AdminApprovalsProps> = ({
  approvalsState,
  match,
  history,
  fetchRevisionDetail,
  fetchAppDetail,
  appDetail,
  revisionDetail
}) => {
  const pageNumber = match.params && !isNaN(match.params.page) ? Number(match.params.page) : 1
  const unfetched = !approvalsState.adminApprovalsData
  const loading = approvalsState.loading
  const list = oc<AdminApprovalsState>(approvalsState).adminApprovalsData.data.data([])
  const { totalCount, pageSize } = oc<AdminApprovalsState>(approvalsState).adminApprovalsData.data({})
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const pageNumberInState = oc<AdminApprovalsState>(approvalsState).adminApprovalsData.data.pageNumber(1)
  const tableColumns = [
    {
      Header: '#',
      id: 'id',
      Cell: ({ row: { index } }) => {
        return <div>{(pageNumberInState - 1) * REVISIONS_PER_PAGE + index + 1}</div>
      }
    },
    {
      Header: 'AppId',
      accessor: 'appId'
    },
    {
      Header: 'Type',
      accessor: 'type'
    },
    {
      Header: 'Description',
      accessor: 'description'
    },
    {
      Header: '',
      id: 'buttonColumn',
      Cell: ({ row: { original } }) => {
        const { appId } = original
        return (
          <button
            data-test={`view-details-button_${appId}`}
            className={`${bulma.button} ${bulma.isPrimary}`}
            onClick={() => {
              const { appId, appRevisionId } = original
              if (appRevisionId && appId) {
                const currentRevisionId = oc<RevisionDetailState>(revisionDetail).revisionDetailData.data.id(undefined)
                const currentAppId = oc<AppDetailState>(appDetail).appDetailData.data.id(undefined)
                if (currentRevisionId !== appRevisionId) {
                  fetchRevisionDetail({ appId, appRevisionId })
                }
                if (currentAppId !== appId) {
                  fetchAppDetail(appId)
                }
                setIsModalOpen(true)
              }
            }}
          >
            View details
          </button>
        )
      }
    }
  ]

  if (unfetched || loading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <div className={`${bulma.container} ${bulma.isRelative} py-8`} data-test="revision-list-container">
        {loading && (
          <div className="pin absolute flex items-center justify-center">
            <Loader />
          </div>
        )}
        {!loading && !list.length ? (
          <Info infoType="ADMIN_APPROVALS_EMPTY" />
        ) : (
          <div>
            {' '}
            <Table loading={false} data={list} columns={tableColumns} />
          </div>
        )}
        <Pagination
          onChange={page => history.push(`${routes.ADMIN_APPROVALS}/${page}`)}
          totalCount={totalCount}
          pageSize={pageSize}
          pageNumber={pageNumber}
        />
      </div>
      <AdminApprovalModal visible={isModalOpen} afterClose={() => setIsModalOpen(false)} />
    </ErrorBoundary>
  )
}

const mapStateToProps = (state: ReduxState): AdminApprovalsMappedProps => ({
  approvalsState: state.adminApprovals,
  appDetail: state.appDetail,
  revisionDetail: state.revisionDetail
})

const mapDispatchToProps = (dispatch: any): AdminApprovalsMappedActions => ({
  fetchRevisionDetail: param => dispatch(revisionDetailRequestData(param)),
  fetchAppDetail: (id: string) => dispatch(appDetailRequestData({ id }))
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AdminApprovals)
)
