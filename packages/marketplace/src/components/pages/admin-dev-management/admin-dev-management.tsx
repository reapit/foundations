import * as React from 'react'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory, useParams, useLocation } from 'react-router'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import { AdminDevManamgenetState } from '@/reducers/admin-dev-management'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Button,
  Loader,
  setQueryParams,
  Helper,
  FlexContainerBasic,
  H3,
  Content,
  toLocalTime,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import AdminDevManagementFilterForm, {
  AdminDevManagementFilterFormValues,
} from '@/components/ui/admin-dev-management-filter-form'
import AdminSetDeveloperStatusModal from '@/components/ui/developer-set-status'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { adminDevManagementRequestData, AdminDevManagementRequestDataValues } from '@/actions/admin-dev-management'
import qs from 'querystring'
import styles from '@/styles/pages/admin-apps.scss?mod'
import { selectAdminDevManagement } from '@/selector/admin'
import { Dispatch } from 'redux'

export interface AdminDevManagementMappedActions {
  fetchData: (requestdata: AdminDevManagementRequestDataValues) => void
}

export interface AdminDevManagementMappedProps {
  adminDevManagementState: AdminDevManamgenetState
  filterValues: AdminDevManagementFilterFormValues
  onPageChange: any
  onSearch: any
}

export type AdminDevManagementProps = AdminDevManagementMappedActions & AdminDevManagementMappedProps

export const buildFilterValues = (queryParams: URLSearchParams): AdminDevManagementFilterFormValues => {
  const name = queryParams.get('name') || ''
  const company = queryParams.get('company') || ''
  const registeredFrom = queryParams.get('registeredFrom') || ''
  const registeredTo = queryParams.get('registeredTo') || ''
  return { name, company, registeredFrom, registeredTo } as AdminDevManagementFilterFormValues
}

export const handleFetchData = (dispatch: Dispatch) => (requestData: AdminDevManagementRequestDataValues) => {
  dispatch(adminDevManagementRequestData(requestData))
}

export const AdminDevManagement: React.FC = () => {
  const dispatch = useDispatch()

  const history = useHistory()
  const location = useLocation()
  const { page = 1 } = useParams()

  const fetchData = handleFetchData(dispatch)

  const queryParams = new URLSearchParams(location.search)
  const filterValues = buildFilterValues(queryParams)

  const onPageChange = onPageChangeHandler(history, filterValues)
  const onSearch = onSearchHandler(history, Number(page))

  const [isSetStatusModalOpen, setIsSetStatusModalOpen] = React.useState(false)
  const [developer, setDeveloper] = React.useState({} as DeveloperModel)

  const adminDevManagementState = useSelector(selectAdminDevManagement)
  const { loading, data } = adminDevManagementState
  const pageNumber = data?.pageNumber || 1

  const resetModal = succeed => () => {
    setIsSetStatusModalOpen(false)
    setDeveloper({})
    if (succeed) {
      fetchData({ page: pageNumber, queryString: qs.stringify(filterValues as { name: string; company: string }) })
    }
  }
  const pageNo = pageNumber - 1
  const pageNoTimesRevsions = pageNo * REVISIONS_PER_PAGE
  const HeaderCell = ({ row: { index } }) => <>{pageNoTimesRevsions + index + 1}</>
  const ButtonCell = ({ row: { original } }) => {
    const { id, isInactive } = original as DeveloperModel

    return (
      <Button
        type="button"
        variant="primary"
        onClick={() => {
          if (id) {
            setDeveloper({ ...original, isInactive: isInactive! })
            setIsSetStatusModalOpen(true)
          }
        }}
      >
        {isInactive ? 'Enable' : 'Deactive'}
      </Button>
    )
  }
  const CreatedCell = ({ cell: { value } }) => <p>{toLocalTime(value)}</p>

  const columns = [
    {
      Header: '#',
      id: 'id',
      Cell: HeaderCell,
    },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Company', accessor: 'company' },
    { Header: 'Job Title', accessor: 'jobTitle' },
    { Header: 'Email', accessor: 'email' },
    { Header: 'Phone', accessor: 'telephone' },
    {
      Header: 'Created',
      accessor: 'created',
      Cell: CreatedCell,
    },
    {
      Header: '',
      id: 'buttonColumn',
      Cell: ButtonCell,
    },
  ]

  if (loading || !data) {
    return <Loader />
  }

  if (!loading && data?.data?.length === 0) {
    return (
      <React.Fragment>
        <Helper variant="info">
          Unfortunately, there are no results that match your search criteria, please try again
        </Helper>
        <Link className="text-center" to="/admin/dev-management">
          <Button variant="primary" type="button">
            New Search
          </Button>
        </Link>
      </React.Fragment>
    )
  }

  return (
    <ErrorBoundary>
      <FlexContainerBasic flexColumn hasBackground hasPadding>
        <H3>Developer Management</H3>
        <AdminDevManagementFilterForm filterValues={filterValues} onSearch={onSearch} />
        <Content className={styles.contentBlock}>
          <Table scrollable={true} loading={false} data={data.data || []} columns={columns} />
          <div className={styles.totalRecordLabel}>Total: {data.totalCount}</div>
        </Content>
        <Pagination
          onChange={onPageChange}
          totalCount={data.totalCount}
          pageSize={data.pageSize}
          pageNumber={data.pageNumber}
        />
      </FlexContainerBasic>

      <AdminSetDeveloperStatusModal
        visible={isSetStatusModalOpen}
        afterClose={resetModal(false)}
        onSuccess={resetModal(true)}
        developer={developer}
      />
    </ErrorBoundary>
  )
}

export const onPageChangeHandler = (history: History<any>, queryParams: AdminDevManagementFilterFormValues) => (
  page: number,
) => {
  const query = setQueryParams(queryParams)
  return history.push(`${Routes.ADMIN_DEV_MANAGEMENT}/${page}?${query}`)
}

export const onSearchHandler = (history: History<any>, page: number) => (
  queryParams: AdminDevManagementFilterFormValues,
) => {
  const query = setQueryParams(queryParams)
  return history.push(`${Routes.ADMIN_DEV_MANAGEMENT}/${page}?${query}`)
}

export default AdminDevManagement
