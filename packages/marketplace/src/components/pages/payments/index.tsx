import React from 'react'
import uuidv4 from 'uuid/v4'
import { useHistory, useLocation } from 'react-router'
import { Field } from 'formik'
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
  Alert,
  Button,
  Checkbox,
  Formik,
  Form,
  notification,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import PaymentsFilterForm, { PaymentsFilterFormValues } from '@/components/ui/payments/payments-filter-form'
import PaymentRequestModal from '@/components/ui/payments/payment-request-modal'
import { paymentsDataStub } from './__stubs__/payments'

export const buildFilterValues = (queryParams: URLSearchParams): PaymentsFilterFormValues => {
  const customers = queryParams.get('customers') || ''
  const properties = queryParams.get('properties') || ''
  const description = queryParams.get('description') || ''
  const requestedFrom = queryParams.get('requestedFrom') || ''
  const requestedTo = queryParams.get('requestedFrom') || ''
  return { customers, properties, description, requestedFrom, requestedTo } as PaymentsFilterFormValues
}

export const onPageChangeHandler = (history: History<any>, queryParams: PaymentsFilterFormValues) => (page: number) => {
  const query = setQueryParams(queryParams)
  let queryString = `?page=${page}`
  if (query && query !== '') {
    queryString = queryString.concat(`&${query}`)
  }
  return history.push(`${Routes.PAYMENTS}${queryString}`)
}

export const onSearchHandler = (history: History<any>) => (queryParams: PaymentsFilterFormValues, { setStatus }) => {
  const cleanedValues = cleanObject(queryParams)
  const { developerId } = cleanedValues
  if (developerId?.length > 1) {
    return notification.error({
      message: errorMessages.SUBSCRIPTION_MULTIPLE_DEVELOPER,
      placement: 'bottomRight',
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
    history.push(`${Routes.PAYMENTS}${queryString}`)
  }
}

const Payments: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const search = location.search
  const queryParams = new URLSearchParams(search)
  const filterValues = buildFilterValues(queryParams)
  const onSearch = React.useCallback(onSearchHandler(history), [history])
  const onPageChange = React.useCallback(onPageChangeHandler(history, filterValues), [history, filterValues])

  const [requestPaymentId, setRequestPaymentId] = React.useState<string>('')
  const { data, totalCount, isLoading, pageSize, pageNumber = 1 } = paymentsDataStub

  const RequestedCell = ({ cell: { value } }) => <p>{toLocalTime(value)}</p>

  const PaymentBtnCell = ({ cell: { value } }) => (
    <div>
      <Button type="button" variant="primary" onClick={() => setRequestPaymentId(value)}>
        Request Payment
      </Button>
      <Button type="button" variant="primary" onClick={() => setRequestPaymentId(value)}>
        Take Payment
      </Button>
    </div>
  )

  const SelectPayment = ({ row: { original } }) => (
    <div>
      <Checkbox id={original.id} labelText="" name="selectedPayment" value={original} />
    </div>
  )

  const generateColumns = (values, setFieldValue) => [
    // const columns = [
    { Header: 'Property', accessor: 'propertyId' },
    { Header: 'Customer', accessor: 'clientId' },
    { Header: 'Description', accessor: 'applicationId' },
    { Header: 'Client A/C', accessor: 'clientAccountName' },
    { Header: 'Status', accessor: 'status' },
    {
      Header: 'Request Date',
      accessor: 'created',
      Cell: RequestedCell,
    },
    { Header: 'Amount', accessor: 'amount' },
    {
      Header: () => {
        return (
          <div className={'field'}>
            <div className="control">
              <Field type="checkbox">
                {() => {
                  const isChecked = values.selectedPayment.length === data.length
                  return (
                    <div className="field field-checkbox">
                      <input
                        id="selectAll"
                        className="checkbox"
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {
                          if (!isChecked) {
                            setFieldValue('selectedPayment', data)
                          } else {
                            setFieldValue('selectedPayment', [])
                          }
                        }}
                      />
                      <label className="label" htmlFor="selectAll">
                        Select All
                      </label>
                    </div>
                  )
                }}
              </Field>
            </div>
          </div>
        )
      },
      Cell: SelectPayment,
      id: uuidv4(),
    },
    {
      accessor: 'id',
      Cell: PaymentBtnCell,
    },
  ]

  return (
    <ErrorBoundary>
      <H3 isHeadingSection>payments</H3>
      <PaymentsFilterForm filterValues={filterValues} onSearch={onSearch} />
      {isLoading || !data ? (
        <Loader />
      ) : (
        <>
          {renderResult(data, generateColumns, totalCount)}
          <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
        </>
      )}
      <PaymentRequestModal isShowConfirmModal={requestPaymentId !== ''} setRequestPaymentId={setRequestPaymentId} />
    </ErrorBoundary>
  )
}

const reducerAli = (accumulator, currentValue) => accumulator + currentValue.amount

const alibabon = arr => {
  const totalCount = arr.reduce(reducerAli, 0)
  return totalCount
}

export const renderResult = (data, generateColumns, totalCount) => {
  if (data?.length === 0) {
    return <Alert message="No Results " type="info" />
  }

  return (
    <Formik initialValues={{ selectedPayment: [] }} onSubmit={values => console.log(values)}>
      {props => {
        const { values, setFieldValue } = props
        return (
          <Form>
            <Section>
              <div>Total: {totalCount}</div>
            </Section>
            <Section>
              <Table
                expandable
                scrollable={true}
                loading={false}
                data={data || []}
                columns={generateColumns(values, setFieldValue)}
              />
            </Section>
            <Section>
              <div>Total Selected: {alibabon(values.selectedPayment)}</div>
              <Button type="submit">Request Selected</Button>
            </Section>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Payments
