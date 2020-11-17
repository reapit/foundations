import React, { useEffect } from 'react'
import { History } from 'history'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Loader,
  setQueryParams,
  H3,
  toLocalTime,
  isEmptyObject,
  Section,
  Alert,
  Button,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import SubscriptionsFilterForm, { SubscriptionsFilterFormValues } from '@/components/ui/subscriptions-filter-form'
import { selectSubscriptionListState } from '@/selector/admin'
import { cleanObject } from '@reapit/utils'
import { fetchSubscriptionList, fetchSubscriptionListValues } from '@/actions/subscriptions'
import store from '../../../core/store'

export const buildFilterValues = (queryParams: URLSearchParams): SubscriptionsFilterFormValues => {
  const type = queryParams.get('type') || ''
  const developerId = queryParams.get('developerId') || ''
  return { type, developerId } as SubscriptionsFilterFormValues
}

export const handleToggleVisibleModal = (setModalOpen: React.Dispatch<boolean>, isVisible: boolean) => () => {
  setModalOpen(isVisible)
}

export const onPageChangeHandler = (history: History<any>, queryParams: SubscriptionsFilterFormValues) => (
  page: number,
) => {
  const query = setQueryParams(queryParams)
  let queryString = `?page=${page}`
  if (query && query !== '') {
    queryString = queryString.concat(`&${query}`)
  }
  return history.push(`${Routes.SUBSCRIPTIONS}${queryString}`)
}

export const onSearchHandler = (history: History<any>) => (
  queryParams: SubscriptionsFilterFormValues,
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
    history.push(`${Routes.SUBSCRIPTIONS}${queryString}`)
  }
}

export const Subscriptions: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const filterValues = buildFilterValues(queryParams)
  const onPageChange = React.useCallback(onPageChangeHandler(history, filterValues), [history, filterValues])
  const onSearch = React.useCallback(onSearchHandler(history), [history])

  const SubscriptionsListState = useSelector(selectSubscriptionListState)

  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1
  useEffect(() => {
    store.dispatch(fetchSubscriptionList({ page, queryString: history.location.search } as fetchSubscriptionListValues))
  }, [history.location.search])

  const { data, totalCount, pageSize, pageNumber = 1, isLoading } = SubscriptionsListState

  const CreatedCell = ({ cell: { value } }) => <p>{toLocalTime(value)}</p>

  const StatusCell = ({ cell: { value } }) => <p>{value ? 'Deactived' : 'Active'}</p>

  const DeleteButton = () => (
    <Button type="button" variant="danger" onClick={() => {}}>
      Cancel
    </Button>
  )

  const columns = [
    { Header: 'Subscription Type', accessor: 'type' },
    { Header: 'Summary', accessor: 'summary' },
    { Header: 'Application ID', accessor: 'applicationId' },
    { Header: 'Member Name', accessor: 'email' },
    { Header: 'Member Email', accessor: 'user' },
    {
      Header: 'Start Date',
      accessor: 'created',
      Cell: CreatedCell,
    },
    {
      Header: 'Renewal Date',
      accessor: 'renews',
    },
    { Header: 'Frequency', accessor: 'frequency' },
    { Header: 'Cost', accessor: 'cost' },
    { Header: 'Status', accessor: 'cancelled', Cell: StatusCell },
    {
      Header: '',
      id: 'membersColumn',
      Cell: DeleteButton,
    },
  ]

  return (
    <ErrorBoundary>
      <Section className="mb-0">
        <H3>Subscriptions</H3>
      </Section>
      <SubscriptionsFilterForm filterValues={filterValues} onSearch={onSearch} />
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          {renderResult(data, columns, totalCount)}
          <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
        </>
      )}
    </ErrorBoundary>
  )
}

export const renderResult = (data, columns, totalCount) => {
  if (data?.length === 0) {
    return <Alert message="No Results " type="info" />
  }

  return (
    <>
      <Section>
        <div>Total: {totalCount}</div>
      </Section>
      <Section>
        <Table expandable scrollable={true} loading={false} data={data || []} columns={columns} />
      </Section>
    </>
  )
}

export default Subscriptions
