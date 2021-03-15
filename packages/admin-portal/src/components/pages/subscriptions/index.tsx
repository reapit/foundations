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
  notification,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import SubscriptionsFilterForm, {
  SubscriptionsFilterFormValues,
} from '@/components/ui/subscriptions/subscriptions-filter-form'
import CancelConfirmModal from '@/components/ui/subscriptions/subscription-cancel-confirm'
import MemberNameCell from '@/components/ui/subscriptions/subscription-member-name-cell'
import { selectSubscriptionListState } from '@/selector/admin'
import { cleanObject, errorMessages } from '@reapit/utils'
import {
  fetchSubscriptionList,
  FetchSubscriptionListQuery,
  cancelSubscription as cancelSubscriptionAc,
} from '@/actions/subscriptions'
import { CancelSubscriptionParams } from '@/services/subscriptions'
import store from '../../../core/store'

export const buildFilterValues = (queryParams: URLSearchParams): SubscriptionsFilterFormValues => {
  const type = queryParams.get('type') || ''
  const developerId = queryParams.get('developerId') || ''
  return { type, developerId } as SubscriptionsFilterFormValues
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
  const { developerId } = cleanedValues
  if (developerId?.length > 1) {
    return notification.error({
      message: errorMessages.SUBSCRIPTION_MULTIPLE_DEVELOPER,
    })
  }

  if (isEmptyObject(cleanedValues)) {
    setStatus('Please enter at least one search criteria')
    return
  }

  setStatus(null)
  const query = setQueryParams(cleanedValues)
  if (query && query !== '') {
    const queryString = `?page=1&${query}`
    history.push(`${Routes.SUBSCRIPTIONS}${queryString}`)
  }
}

const Subscriptions: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const queryParams = new URLSearchParams(location.search)
  const filterValues = buildFilterValues(queryParams)
  const onPageChange = React.useCallback(onPageChangeHandler(history, filterValues), [history, filterValues])
  const onSearch = React.useCallback(onSearchHandler(history), [history])

  const SubscriptionsListState = useSelector(selectSubscriptionListState)

  const page = queryParams.get('page') ? Number(queryParams.get('page')) : 1
  useEffect(() => {
    if (search) {
      store.dispatch(fetchSubscriptionList({ page, queryString: search } as FetchSubscriptionListQuery))
    }
  }, [search])

  const [cancelSubId, setCancelSubId] = React.useState<string>('')

  const onCancelSubscription = () => {
    store.dispatch(
      cancelSubscriptionAc({
        id: cancelSubId,
      } as CancelSubscriptionParams),
    )
  }

  const { data, totalCount, pageSize, pageNumber = 1, isLoading, cancelSubscription } = SubscriptionsListState

  const CreatedCell = ({ cell: { value } }) => <p>{toLocalTime(value)}</p>

  const StatusCell = ({ cell: { value } }) => <p>{value ? 'Deactived' : 'Active'}</p>

  const DeleteButton = ({ cell: { value } }) => (
    <Button type="button" variant="danger" onClick={() => setCancelSubId(value)}>
      Cancel
    </Button>
  )

  const columns = [
    { Header: 'Subscription Type', accessor: 'type' },
    { Header: 'Summary', accessor: 'summary' },
    { Header: 'Application ID', accessor: 'applicationId' },
    { Header: 'Member Name', accessor: 'developerId', Cell: MemberNameCell },
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
      accessor: 'id',
      Cell: DeleteButton,
    },
  ]

  return (
    <ErrorBoundary>
      <H3>Subscriptions</H3>
      <SubscriptionsFilterForm filterValues={filterValues} onSearch={onSearch} />
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          {renderResult(data, columns, totalCount)}
          <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
        </>
      )}
      <CancelConfirmModal
        onConfirm={onCancelSubscription}
        isShowConfirmModal={cancelSubId !== ''}
        setCancelSubId={setCancelSubId}
        isCanceling={cancelSubscription.isLoading}
      />
    </ErrorBoundary>
  )
}

export const renderResult = (data, columns, totalCount) => {
  if (data?.length === 0) {
    return <Alert message="No Results " type="primary" />
  }

  return (
    <>
      <Section hasPadding={false}>
        <div>Total: {totalCount}</div>
      </Section>
      <Table expandable scrollable={true} loading={false} data={data || []} columns={columns} />
    </>
  )
}

export default Subscriptions
