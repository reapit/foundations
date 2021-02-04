import React, { useCallback, useState } from 'react'
import useSWR from 'swr'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Loader,
  H3,
  toLocalTime,
  DATE_TIME_FORMAT,
  FadeIn,
  combineAddress,
  Section,
  Helper,
  Table,
  Pagination,
} from '@reapit/elements'
import { URLS } from '../../constants/api'
import { PaymentModel, PaymentModelPagedResult, PropertyModel } from '@reapit/foundations-ts-definitions'
import { statusOptions } from '../../constants/filter-options'
import { PaymentLogo } from '../ui/payment-logo'
import PaymentsFilterForm from '../ui/payments-filter-form'
import PaymentRequestModal from '../ui/payment-request-modal'
import { buildFilterValues, handleTakePayment, onPageChangeHandler, onSearchHandler } from './payment-page-handlers'

export const RequestedCell = ({ cell: { value } }) => <p>{toLocalTime(value, DATE_TIME_FORMAT.DATE_FORMAT)}</p>

export const AmountCell = ({ cell: { value } }) => <p>{`£${value ? value.toFixed(2) : 0}`}</p>

export const StatusCell = ({ cell: { value } }) => {
  const statusText = statusOptions.find(item => item.value === value)?.label ?? 'Other'
  return <p>{statusText}</p>
}

export const PropertyCell = ({ cell: { value } }) => {
  const { data } = useSWR<PropertyModel | undefined>(`${URLS.PROPERTIES}/${value}`)
  if (!data || !data.address) return null
  return <FadeIn>{combineAddress(data?.address)}</FadeIn>
}

export const RequestPaymentCell = (setSelectedPayment: (payment: PaymentModel) => void) => (cell: {
  data: PaymentModel[]
  value: string
}) => {
  const { data, value } = cell
  const payment = data?.find(item => item.id === value)
  if (!payment) return null
  if (payment.status === 'posted') return <b>Paid</b>
  return <a onClick={() => setSelectedPayment(payment)}>Email</a>
}

export const TakePaymentCell = (handleTakePayment: (value: string) => void) => (cell: {
  data: PaymentModel[]
  value: string
}) => {
  const { data, value } = cell
  const payment = data?.find(item => item.id === value)
  if (!payment) return null
  if (payment.status === 'posted') return <b>Paid</b>
  return <a onClick={() => handleTakePayment(value)}>Card</a>
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

  const { data: payments, mutate: refetchPayments } = useSWR<PaymentModelPagedResult | undefined>(
    search ? `${URLS.PAYMENTS}/${search}` : null,
  )

  return (
    <ErrorBoundary>
      <Section>
        <div className="justify-between flex items-center">
          <H3 className="mb-0">Payments Dashboard</H3>
          <PaymentLogo />
        </div>
      </Section>
      <PaymentsFilterForm filterValues={filterValues} onSearch={onSearch} />
      {!payments ? (
        <Loader />
      ) : payments?._embedded?.length ? (
        <>
          <Section>
            <FadeIn>
              <Table
                expandable
                scrollable={true}
                data={payments._embedded || []}
                columns={[
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
                    id: 'customer.id',
                    accessor: 'id',
                    Cell: RequestPaymentCell(setSelectedPayment),
                  },
                  {
                    Header: 'Card Payment',
                    id: 'id',
                    accessor: 'id',
                    Cell: TakePaymentCell(handleTakePayment),
                  },
                ]}
              />
            </FadeIn>
          </Section>
          <Pagination
            onChange={onPageChange}
            totalCount={payments.totalCount}
            pageSize={payments.pageSize}
            pageNumber={payments.pageNumber}
          />
        </>
      ) : (
        <Helper variant="info">No payments match your search criteria</Helper>
      )}
      <PaymentRequestModal
        payment={selectedPayment}
        setSelectedPayment={setSelectedPayment}
        refetchPayments={refetchPayments}
      />
    </ErrorBoundary>
  )
}

export default Payments
