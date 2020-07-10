import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { useHistory, useLocation } from 'react-router'
import { Loader, Pagination, Table, Button, Helper, infoText, Section, H3 } from '@reapit/elements'
import { revisionDetailRequestData } from '@/actions/revision-detail'
import Routes from '@/constants/routes'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { appDetailRequestData } from '@/actions/app-detail'
import { ApprovalModel, AppRevisionModel } from '@reapit/foundations-ts-definitions'
import { AppDetailModel } from '@/types/marketplace-api-schema'
import { selectApp } from '@/selector/app-detail'
import { selectAppRevision } from '@/selector/app-revisions'
import AdminApprovalModal from '@/components/ui/admin-approval-modal'
import { selectAdminApprovalsState, selectWaitingApprovalData } from '@/selector/admin'

export type HandleCloseModalParams = {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const handleCloseModal = ({ setIsModalOpen }: HandleCloseModalParams) => () => setIsModalOpen(false)

export const handleOnPageChange = (history: { push: (path: string) => void }) => (page: number) =>
  history.push(`${Routes.ADMIN_APPROVALS}?page=${page}`)

export const Content = ({
  loading,
  waitingApprovalList,
  tableColumns,
}: {
  loading: Boolean
  waitingApprovalList: ApprovalModel[]
  tableColumns: any
}) => {
  if (loading) {
    return (
      <div className="pin absolute flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  if (!loading && !waitingApprovalList.length) {
    return <Helper variant="info">{infoText('ADMIN_APPROVALS_EMPTY')}</Helper>
  }

  return <Table scrollable={true} loading={false} data={waitingApprovalList} columns={tableColumns} />
}

export type RenderIdParams = {
  page: number
}

export type RowIdParams = {
  row: { index: number }
}

export const renderId = ({ page }: RenderIdParams) => ({ row: { index } }: RowIdParams) => {
  const pageNoTimesRevsions = (page - 1) * REVISIONS_PER_PAGE
  return <div>{pageNoTimesRevsions + index + 1}</div>
}

export type HandleViewDetailOnClickParams = {
  dispatch: Dispatch<any>
  appId: string
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  appRevisionId: string
  currentRevisionId?: string
  currentAppId?: string
}

export const handleViewDetailOnClick = ({
  dispatch,
  appRevisionId,
  currentRevisionId,
  appId,
  currentAppId,
  setIsModalOpen,
}: HandleViewDetailOnClickParams) => () => {
  const isNeedFetchRevision = currentRevisionId !== appRevisionId
  const isNeedFetchAppDetail = currentAppId !== appId
  if (appRevisionId && appId && isNeedFetchRevision) {
    dispatch(revisionDetailRequestData({ appId, appRevisionId }))
  }
  if (appRevisionId && appId && isNeedFetchAppDetail) {
    dispatch(appDetailRequestData({ id: appId }))
  }
  setIsModalOpen(true)
}

export type RenderViewDetailButtonParams = {
  revisionDetail: AppRevisionModel
  appDetail: AppDetailModel
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  dispatch: Dispatch<any>
}

export type RowDetailButtonParams = {
  row: { original: { appId: string; appRevisionId: string } }
}

export const renderViewDetailButton = ({
  revisionDetail,
  appDetail,
  setIsModalOpen,
  dispatch,
}: RenderViewDetailButtonParams) => ({ row: { original } }: RowDetailButtonParams) => {
  const { appId, appRevisionId } = original
  const currentRevisionId = revisionDetail?.id
  const currentAppId = appDetail?.id
  return (
    <Button
      dataTest={`view-details-button_${appId}`}
      type="button"
      variant="primary"
      onClick={handleViewDetailOnClick({
        appRevisionId,
        currentRevisionId,
        currentAppId,
        dispatch,
        setIsModalOpen,
        appId,
      })}
    >
      View details
    </Button>
  )
}

export const generateTableColumn = ({
  page,
  revisionDetail,
  appDetail,
  setIsModalOpen,
  dispatch,
}: RenderIdParams & RenderViewDetailButtonParams) => [
  {
    Header: '#',
    id: 'id',
    Cell: renderId({ page }),
  },
  {
    Header: 'AppId',
    accessor: 'appId',
  },
  {
    Header: 'Type',
    accessor: 'type',
  },
  {
    Header: 'Description',
    accessor: 'description',
  },
  {
    Header: '',
    id: 'buttonColumn',
    Cell: renderViewDetailButton({ revisionDetail, appDetail, dispatch, setIsModalOpen }),
  },
]

export const AdminApprovals: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const dispatch = useDispatch()
  const appDetail = useSelector(selectApp)
  const location = useLocation()
  const history = useHistory()
  const revisionDetail = useSelector(selectAppRevision)
  const approvalsState = useSelector(selectAdminApprovalsState)
  const waitingApprovalListData = useSelector(selectWaitingApprovalData)
  const urlParams = new URLSearchParams(location.search)
  const page = urlParams.get('page') || 1
  const isLoading = approvalsState.loading

  return (
    <>
      <Section>
        <H3>App Revision Approvals</H3>
      </Section>
      <Section>
        <Content
          loading={isLoading}
          waitingApprovalList={waitingApprovalListData.data || []}
          tableColumns={generateTableColumn({
            page: Number(page),
            revisionDetail,
            appDetail,
            dispatch,
            setIsModalOpen,
          })}
        />
      </Section>
      <Pagination
        onChange={handleOnPageChange(history)}
        totalCount={waitingApprovalListData.totalCount}
        pageSize={waitingApprovalListData.pageSize}
        pageNumber={Number(page)}
      />
      <AdminApprovalModal visible={isModalOpen} afterClose={handleCloseModal({ setIsModalOpen })} />
    </>
  )
}

export default AdminApprovals
