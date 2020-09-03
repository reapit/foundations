import React from 'react'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import { REVISIONS_PER_PAGE } from '@/constants/paginator'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Button,
  Loader,
  setQueryParams,
  H3,
  toLocalTime,
  isEmptyObject,
  Section,
  Alert,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import DevsManagementFilterForm, { DevsManagementFilterFormValues } from '@/components/ui/devs-management-filter-form'
// import SetDeveloperStatusModal from '@/components/ui/developer-set-status'
import { DeveloperModel } from '@reapit/foundations-ts-definitions'
import { fetchDeveloperList, fetchDeveloperListValues } from '@/actions/devs-management'
import qs from 'querystring'
import { selectDeveloperListState } from '@/selector/admin'
import { Dispatch } from 'redux'
import { cleanObject } from '@reapit/utils'
import StatusModal from './set-status-modal/status-modal'

// export interface DevsManagementMappedActions {
//   fetchData: (requestdata: fetchDeveloperListValues) => void
// }

// export interface DevsManagementMappedProps {
//   DeveloperListState: DeveloperListState
//   filterValues: DevsManagementFilterFormValues
//   onPageChange: any
//   onSearch: any
// }

// export type DevsManagementProps = DevsManagementMappedActions & DevsManagementMappedProps

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

export const onClickStatusButton = (
  setDeveloper: React.Dispatch<DeveloperModel>,
  setIsSetStatusModalOpen: React.Dispatch<boolean>,
  developerData,
) => () => {
  setDeveloper({ ...developerData })
  setIsSetStatusModalOpen(true)
}

export const DevsManagement: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const fetchData = handleFetchData(dispatch)
  const queryParams = new URLSearchParams(location.search)
  const filterValues = buildFilterValues(queryParams)
  const onPageChange = React.useCallback(onPageChangeHandler(history, filterValues), [history, filterValues])
  const onSearch = React.useCallback(onSearchHandler(history), [history])
  const [isSetStatusModalOpen, setIsSetStatusModalOpen] = React.useState(false)
  const [developer, setDeveloper] = React.useState<DeveloperModel>({} as DeveloperModel)

  const DeveloperListState = useSelector(selectDeveloperListState)
  const { data, totalCount, pageSize, pageNumber = 1, isLoading } = DeveloperListState

  const resetModal = succeed => () => {
    setIsSetStatusModalOpen(false)
    setDeveloper({})
    if (succeed) {
      fetchData({ page: pageNumber, queryString: qs.stringify(filterValues as { name: string; company: string }) })
    }
  }

  const pageNo = pageNumber - 1
  const pageNoTimesRevsions = pageNo * REVISIONS_PER_PAGE
  const HeaderCell = ({ row: { index } }) => <div style={{ width: 'auto' }}>{pageNoTimesRevsions + index + 1}</div>

  // Note: Comment because not use in the moment

  // const ButtonCell = ({ row: { original } }) => {
  //   const { id, isInactive } = original as DeveloperModel

  //   return (
  //     <Button
  //       type="button"
  //       variant="primary"
  //       onClick={() => {
  //         if (id) {
  //           setDeveloper({ ...original, isInactive: isInactive! })
  //           setIsSetStatusModalOpen(true)
  //         }
  //       }}
  //     >
  //       {isInactive ? 'Enable' : 'Deactive'}
  //     </Button>
  //   )
  // }

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

  return (
    <ErrorBoundary>
      <Section className="mb-0">
        <H3>Developer Management</H3>
      </Section>
      <DevsManagementFilterForm filterValues={filterValues} onSearch={onSearch} />
      {isLoading || !data ? <Loader /> : renderResult(data, columns, totalCount)}
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
      {/* <SetDeveloperStatusModal
        visible={isSetStatusModalOpen}
        afterClose={resetModal(false)}
        onSuccess={resetModal(true)}
        developer={developer}
      />  */}
      <StatusModal visible={isSetStatusModalOpen} developer={developer} resetModal={resetModal} />
    </ErrorBoundary>
  )
}

export const renderResult = (data, columns, totalCount) => {
  return data?.length === 0 ? (
    <Alert message="No Results " type="info" />
  ) : (
    <>
      <Section>
        <div>Total: {totalCount}</div>
      </Section>
      <Section>
        <Table scrollable={true} loading={false} data={data || []} columns={columns} />
      </Section>
    </>
  )
}

export default DevsManagement
