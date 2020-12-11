import React from 'react'
import uuidv4 from 'uuid/v4'
import useSWR, { mutate } from 'swr'
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
  DATE_TIME_FORMAT,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import PaymentsFilterForm, { PaymentsFilterFormValues } from '@/components/ui/payments/payments-filter-form'
import PaymentRequestModal from '@/components/ui/payments/payment-request-modal'
import { URLS } from '../../../constants/api'

interface CustomerAddress {
  buildingName: string
  buildingNumber: string
  countryId: string
  line1: string
  line2: string
  line3: string
  line4: string
  postcode: string
}

interface Customer {
  email: string
  forename: string
  homePhone: string
  id: string
  mobilePhone: string
  name: string
  primaryAddress: CustomerAddress
  surname: string
  title: string
  type: string
}

interface Payment {
  clientAccountName: string
  companyId: string
  created: '2020-11-13T12:17:38.0000000Z'
  customer: Customer
  description: string
  externalReference: string
  id: string
  landlordId: string
  ledger: string
  modified: '2020-12-02T17:45:58.0000000Z'
  netAmount: number
  propertyId: string
  status: string
  tenancyId: null
  type: string
  vatAmount: number
}

export const buildFilterValues = (queryParams: URLSearchParams): PaymentsFilterFormValues => {
  const customers = queryParams.get('customers') || ''
  const properties = queryParams.get('properties') || ''
  const description = queryParams.get('description') || ''
  const createdFrom = queryParams.get('createdFrom') || ''
  const createdTo = queryParams.get('createdTo') || ''
  return { customers, properties, description, createdFrom, createdTo } as PaymentsFilterFormValues
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
    mutate(`${URLS.PAYMENTS}/${queryString}`)
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

  const { data }: any = useSWR(URLS.PAYMENTS)

  const handleTakePayment = (id: string) => {
    return history.push(`${Routes.PAYMENTS}/${id}`)
  }

  const RequestedCell = ({ cell: { value } }) => <p>{toLocalTime(value, DATE_TIME_FORMAT.DATE_FORMAT)}</p>

  const PaymentBtnCell = ({ cell: { value } }) => (
    <div>
      <Button type="button" variant="primary" onClick={() => setRequestPaymentId(value)}>
        Request Payment
      </Button>
      <Button type="button" variant="primary" onClick={() => handleTakePayment(value)}>
        Take Payment
      </Button>
    </div>
  )

  const SelectPayment = ({ row: { original } }) => (
    <div>
      <Checkbox id={original.id} labelText="" name="selectedPayment" value={original} />
    </div>
  )

  const generateColumns = (values: any, setFieldValue: Function, data: Array<Payment>) => [
    { Header: 'Property', accessor: 'propertyId' },
    { Header: 'Customer', accessor: 'customer.name' },
    { Header: 'Description', accessor: 'description' },
    { Header: 'Client A/C', accessor: 'clientAccountName' },
    { Header: 'Status', accessor: 'status' },
    {
      Header: 'Request Date',
      accessor: 'created',
      Cell: RequestedCell,
    },
    { Header: 'Amount', accessor: 'netAmount' },
    {
      Header: <SelectAllHeader values={values} setFieldValue={setFieldValue} data={data} />,
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
      <H3 isHeadingSection>Payments</H3>
      <PaymentsFilterForm filterValues={filterValues} onSearch={onSearch} />
      {!data ? (
        <Loader />
      ) : (
        <PaymentsContent data={data} generateColumns={generateColumns} onPageChange={onPageChange} />
      )}
      <PaymentRequestModal isShowConfirmModal={requestPaymentId !== ''} setRequestPaymentId={setRequestPaymentId} />
    </ErrorBoundary>
  )
}

const SelectAllHeader: React.FC<{ values: any; setFieldValue: Function; data: Array<Payment> }> = ({
  values,
  setFieldValue,
  data,
}) => {
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
}

const PaymentsContent: React.FC<{ data: any; generateColumns: Function; onPageChange: (page: number) => void }> = ({
  data,
  generateColumns,
  onPageChange,
}) => {
  const { _embedded: listPayment, totalCount, pageSize, pageNumber = 1 } = data
  return (
    <>
      {renderResult(listPayment, generateColumns, totalCount)}
      <Pagination onChange={onPageChange} totalCount={totalCount} pageSize={pageSize} pageNumber={pageNumber} />
    </>
  )
}

const reducerTotal = (accumulator: number, currentValue: Payment) => accumulator + currentValue.netAmount

const getTotal = (arr: Array<Payment>) => {
  const totalCount = arr.reduce(reducerTotal, 0)
  return totalCount
}

export const renderResult = (data: Array<Payment>, generateColumns: Function, totalCount: number) => {
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
                data={data || []}
                columns={generateColumns(values, setFieldValue, data)}
              />
            </Section>
            <Section>
              <div>Total Selected: {getTotal(values.selectedPayment)}</div>
              <Button type="submit">Request Selected</Button>
            </Section>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Payments
