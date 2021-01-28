import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import { History } from 'history'
import ErrorBoundary from '@/components/hocs/error-boundary'
import { cleanObject, errorMessages } from '@reapit/utils'
import {
  Pagination,
  Table,
  Loader,
  setQueryParams,
  H3,
  toLocalTime,
  isEmptyObject,
  Section,
  Formik,
  Form,
  notification,
  DATE_TIME_FORMAT,
  Helper,
  FadeIn,
  combineAddress,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import PaymentsFilterForm, { PaymentsFilterFormValues } from '@/components/ui/payments/payments-filter-form'
import PaymentRequestModal from '@/components/ui/payments/payment-request-modal'
import { URLS } from '../../constants/api'
import { PaymentModel, PaymentModelPagedResult, PropertyModel } from '@reapit/foundations-ts-definitions'
import { statusOptions } from '../../constants/filter-options'
import dayjs from 'dayjs'

export const buildFilterValues = (queryParams: URLSearchParams): PaymentsFilterFormValues => {
  const defaultCreatedFrom = dayjs(new Date())
    .subtract(1, 'month')
    .format(DATE_TIME_FORMAT.YYYY_MM_DD)
  const defaultCreatedTo = dayjs(new Date()).format(DATE_TIME_FORMAT.YYYY_MM_DD)

  const properties = queryParams.get('properties') || ''
  const description = queryParams.get('description') || ''
  const createdFrom = queryParams.get('createdFrom') || defaultCreatedFrom
  const createdTo = queryParams.get('createdTo') || defaultCreatedTo
  const status = queryParams.getAll('status') || []
  const type = queryParams.getAll('type') || []
  return { properties, description, createdFrom, createdTo, status, type } as PaymentsFilterFormValues
}

export const onPageChangeHandler = (history: History<any>, queryParams: PaymentsFilterFormValues) => (page: number) => {
  const query = setQueryParams(queryParams)
  let queryString = `?pageNumber=${page}`
  if (query && query !== '') {
    queryString = queryString.concat(`&${query}`)
  }
  return history.push(`${Routes.PAYMENTS}${queryString}`)
}

export const onSearchHandler = (history: History<any>) => (queryParams: PaymentsFilterFormValues) => {
  const cleanedValues = cleanObject(queryParams)
  const { developerId } = cleanedValues
  if (developerId?.length > 1) {
    return notification.error({
      message: errorMessages.SUBSCRIPTION_MULTIPLE_DEVELOPER,
      placement: 'bottomRight',
    })
  }

  if (isEmptyObject(cleanedValues)) {
    history.push(`${Routes.PAYMENTS}`)
    return
  }

  const query = setQueryParams(cleanedValues)
  if (query && query !== '') {
    const queryString = `?pageNumber=1&${query}`
    history.push(`${Routes.PAYMENTS}${queryString}`)
  }
}

const Payments: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const queryParams = new URLSearchParams(search)
  const filterValues = buildFilterValues(queryParams)
  const onSearch = useCallback(onSearchHandler(history), [history])
  const onPageChange = useCallback(onPageChangeHandler(history, filterValues), [history, filterValues])
  const [selectedPayment, setSelectedPayment] = useState<PaymentModel | null>(null)

  if (!search) {
    onSearch(filterValues)
  }

  const { data: payment } = useSWR<PaymentModelPagedResult | undefined>(search ? `${URLS.PAYMENTS}/${search}` : null)

  const handleTakePayment = (id: string) => {
    return history.push(`${Routes.PAYMENTS}/${id}`)
  }

  const RequestedCell = ({ cell: { value } }) => <p>{toLocalTime(value, DATE_TIME_FORMAT.DATE_FORMAT)}</p>

  const AmountCell = ({ cell: { value } }) => <p>{`£${value ? (value / 100).toFixed(2) : 0}`}</p>

  const StatusCell = ({ cell: { value } }) => {
    const statusText = statusOptions.find(item => item.value === value)?.label ?? 'Other'
    return <p>{statusText}</p>
  }

  const PropertyCell = ({ cell: { value } }) => {
    const { data } = useSWR<PropertyModel | undefined>(`${URLS.PROPERTIES}/${value}`)
    if (!data || !data.address) return null
    return <FadeIn>{combineAddress(data?.address)}</FadeIn>
  }

  const RequestPaymentCell = (cell: { data: PaymentModel[]; value: string }) => {
    const { data, value } = cell
    const payment = data?.find(item => item.id === value)
    if (!payment) return null
    return <a onClick={() => setSelectedPayment(payment)}>Email</a>
  }

  const TakePaymentCell = ({ cell: { value } }) => <a onClick={() => handleTakePayment(value)}>Card</a>

  const columns = [
    { Header: 'Property', accessor: 'propertyId', Cell: PropertyCell },
    { Header: 'Amount', accessor: 'amount', Cell: AmountCell },
    { Header: 'Customer', accessor: 'customer.name' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Client A/C', accessor: 'clientAccountName' },
    { Header: 'Status', accessor: 'status', Cell: StatusCell },
    {
      Header: 'Request Date',
      accessor: 'created',
      Cell: RequestedCell,
    },
    {
      Header: 'Email Invoice',
      id: Math.floor(Math.random() * 1000),
      accessor: 'id',
      Cell: RequestPaymentCell,
    },
    {
      Header: 'Card Payment',
      id: Math.floor(Math.random() * 1000),
      accessor: 'id',
      Cell: TakePaymentCell,
    },
  ]

  return (
    <ErrorBoundary>
      <H3 isHeadingSection>Payments Dashboard</H3>
      <PaymentsFilterForm filterValues={filterValues} onSearch={onSearch} />
      {!payment ? <Loader /> : <PaymentsContent payment={payment} columns={columns} onPageChange={onPageChange} />}
      <PaymentRequestModal payment={selectedPayment} setSelectedPayment={setSelectedPayment} />
    </ErrorBoundary>
  )
}

export const PaymentsContent: React.FC<{
  payment: PaymentModelPagedResult
  columns: any[]
  onPageChange: (page: number) => void
}> = ({ payment, columns, onPageChange }) => {
  const { _embedded, totalCount, pageSize, pageNumber = 1 } = payment
  return !_embedded?.length ? (
    <Helper variant="info">No payments match your search criteria</Helper>
  ) : (
    <>
      <Formik initialValues={{ selectedPayment: [] }} onSubmit={values => console.log(values)}>
        {() => {
          return (
            <Form>
              <Section>
                <FadeIn>
                  <Table expandable scrollable={true} data={_embedded || []} columns={columns} />
                </FadeIn>
              </Section>
            </Form>
          )
        }}
      </Formik>
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </>
  )
}

export default Payments
