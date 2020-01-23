import * as React from 'react'
import { connect } from 'react-redux'
import { ReduxState } from '@/types/core'
import { AdminApprovalsState } from '@/reducers/admin-approvals'
import {
  Loader,
  Pagination,
  Table,
  Button,
  Info,
  FlexContainerResponsive,
  Helper,
  infoText,
  FlexContainerBasic
} from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { withRouter, RouteComponentProps } from 'react-router'
import routes from '@/constants/routes'
import { AppDetailState } from '@/reducers/app-detail'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { revisionDetailRequestData, RevisionDetailRequestParams } from '@/actions/revision-detail'
import AdminApprovalModal from '../ui/admin-approval-modal'
import { appDetailRequestData } from '@/actions/app-detail'
import { RevisionDetailState } from '@/reducers/revision-detail'
import { ApprovalModel } from '@reapit/foundations-ts-definitions'

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

export const handleAfterClose = ({ setIsModalOpen }) => () => setIsModalOpen(false)

export const handleOnPageChange = history => page => history.push(`${routes.ADMIN_APPROVALS}/${page}`)

export const RenderContent = ({
  loading,
  list,
  tableColumns
}: {
  loading: Boolean
  list: ApprovalModel[]
  tableColumns: any
}) => {
  if (loading) {
    return (
      <div className="pin absolute flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (!loading && !list.length) {
    return (
      <FlexContainerBasic hasPadding flexColumn>
        <Helper variant="info">{infoText('ADMIN_APPROVALS_EMPTY')}</Helper>
      </FlexContainerBasic>
    )
  }

  return (
    <div>
      <Table scrollable={true} loading={false} data={list} columns={tableColumns} />
    </div>
  )
}

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
  const list = approvalsState?.adminApprovalsData?.data?.data || []
  const { totalCount, pageSize } = approvalsState?.adminApprovalsData?.data || {}
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const pageNumberInState = approvalsState?.adminApprovalsData?.data?.pageNumber || 1
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
          <Button
            dataTest={`view-details-button_${appId}`}
            type="button"
            variant="primary"
            onClick={() => {
              const { appId, appRevisionId } = original
              if (appRevisionId && appId) {
                const currentRevisionId = revisionDetail?.revisionDetailData?.data?.id
                const currentAppId = appDetail?.appDetailData?.data?.id
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
          </Button>
        )
      }
    }
  ]

  return (
    <ErrorBoundary>
      <div id="page-admin-approvals-container">
        {!unfetched && !loading && (
          <FlexContainerResponsive data-test="revision-list-container">
            <RenderContent loading={loading} list={list} tableColumns={tableColumns} />
            <Pagination
              onChange={handleOnPageChange(history)}
              totalCount={totalCount}
              pageSize={pageSize}
              pageNumber={pageNumber}
            />
          </FlexContainerResponsive>
        )}
        <AdminApprovalModal visible={isModalOpen} afterClose={handleAfterClose({ setIsModalOpen })} />
      </div>
    </ErrorBoundary>
  )
}

export const mapStateToProps = (state: ReduxState): AdminApprovalsMappedProps => ({
  approvalsState: state.adminApprovals,
  appDetail: state.appDetail,
  revisionDetail: state.revisionDetail
})

export const mapDispatchToProps = (dispatch: any): AdminApprovalsMappedActions => ({
  fetchRevisionDetail: param => dispatch(revisionDetailRequestData(param)),
  fetchAppDetail: (id: string) => dispatch(appDetailRequestData({ id }))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdminApprovals))
