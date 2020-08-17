import React from 'react'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Button,
  Loader,
  setQueryParams,
  Helper,
  H3,
  toLocalTime,
  isEmptyObject,
  Section,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import DevsManagementFilterForm, { DevsManagementFilterFormValues } from '@/components/ui/devs-management-filter-form'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { fetchDeveloperList, fetchDeveloperListValues } from '@/actions/devs-management'
import qs from 'querystring'
import { selectDeveloperListState } from '@/selector/admin'
import { Dispatch } from 'redux'
import { cleanObject } from '@reapit/utils'
import StatusModal from './set-status-modal/status-modal'

export const buildFilterValues = (queryParams: URLSearchParams): DevsManagementFilterFormValues => {
  const name = queryParams.get('name') || ''
  const company = queryParams.get('company') || ''
  const registeredFrom = queryParams.get('registeredFrom') || ''
  const registeredTo = queryParams.get('registeredTo') || ''
  return { name, company, registeredFrom, registeredTo } as DevsManagementFilterFormValues
}

export const handleFetchData = (dispatch: Dispatch) => (requestData: fetchDeveloperListValues) => {
  dispatch(fetchDeveloperList(requestData))
}

export const onPageChangeHandler = (history: History<any>, queryParams: DevsManagementFilterFormValues) => (
  page: number,
) => {
  const query = setQueryParams(queryParams)
  let queryString = `?page=${page}`
  if (query && query !== '') {
    queryString = queryString.concat(`&${query}`)
  }
  return history.push(`${Routes.DEV_MANAGEMENT}${queryString}`)
}

export const onSearchHandler = (history: History<any>) => (
  queryParams: DevsManagementFilterFormValues,
  { setStatus },
) => {
  const cleanedValues = cleanObject(queryParams)

  if (isEmptyObject(cleanedValues)) {
    setStatus('Please enter at least one search criteria')
    return
  }
  const query = setQueryParams(cleanedValues)
  if (query && query !== '') {
    const queryString = `?page=1&${query}`
    history.push(`${Routes.DEV_MANAGEMENT}${queryString}`)
  }
}

export const Customers: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const fetchData = handleFetchData(dispatch)
  const queryParams = new URLSearchParams(location.search)
  const filterValues = buildFilterValues(queryParams)
  const onPageChange = React.useCallback(onPageChangeHandler(history, filterValues), [history, filterValues])
  const onSearch = React.useCallback(onSearchHandler(history), [history])

  const DeveloperListState = useSelector(selectDeveloperListState)
  const { data, totalCount, pageSize, pageNumber = 1, isLoading } = DeveloperListState

  const pageNo = pageNumber - 1
  const pageNoTimesRevsions = pageNo * REVISIONS_PER_PAGE
  const HeaderCell = ({ row: { index } }) => <div style={{ width: 'auto' }}>{pageNoTimesRevsions + index + 1}</div>

  const CreatedCell = ({ cell: { value } }) => <p>{toLocalTime(value)}</p>
  const StatusBtnCell = ({ row: { original } }) => {
    return (
      <Button
        type="button"
        variant="primary"
        onClick={onClickStatusButton(setDeveloper, setIsSetStatusModalOpen, original)}
      >
        Status
      </Button>
    )
  }

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
      Header: 'Status',
      accessor: 'status',
      columnProps: {
        className: 'capitalize',
      },
    },
    {
      Header: '',
      id: 'buttonColumn',
      Cell: StatusBtnCell,
    },
  ]

  if (!isLoading && data?.length === 0) {
    return (
      <React.Fragment>
        <Helper variant="info">
          Unfortunately, there are no results that match your search criteria, please try again
        </Helper>
        <Link className="text-center" to={Routes.DEV_MANAGEMENT}>
          <Button variant="primary" type="button">
            New Search
          </Button>
        </Link>
      </React.Fragment>
    )
  }

  return (
    <ErrorBoundary>
      <Section className="mb-0">
        <H3>Developer Management</H3>
      </Section>
      <DevsManagementFilterForm filterValues={filterValues} onSearch={onSearch} />
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          <Section>
            <Table scrollable={true} loading={false} data={data || []} columns={columns} />
          </Section>
          <Section>
            <div>Total: {totalCount}</div>
          </Section>
          <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
        </>
      )}
    </ErrorBoundary>
  )
}

export default Customers
