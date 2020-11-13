import React from 'react'
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
} from '@reapit/elements'
import Routes from '@/constants/routes'
import SubscriptionsFilterForm, { SubscriptionsFilterFormValues } from '@/components/ui/subscriptions-filter-form'
import { selectSubscriptionListState } from '@/selector/admin'
import { cleanObject } from '@reapit/utils'

export const buildFilterValues = (queryParams: URLSearchParams): SubscriptionsFilterFormValues => {
  const type = queryParams.get('name') || ''
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
  const { data, totalCount, pageSize, pageNumber = 1, isLoading } = SubscriptionsListState

  const CreatedCell = ({ cell: { value } }) => <p>{toLocalTime(value)}</p>

  const columns = [
    { Header: 'Company', accessor: 'company' },
    { Header: 'Name', accessor: 'name' },
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
  ]

  if (isLoading || !data) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <Section className="mb-0">
        <H3>Subscriptions</H3>
      </Section>
      <SubscriptionsFilterForm filterValues={filterValues} onSearch={onSearch} />
      {renderResult(data, columns, totalCount)}
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
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
