import React from 'react'
import { History } from 'history'
import { useSelector } from 'react-redux'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Button,
  Alert,
  Section,
  Form,
  FormSection,
  Grid,
  GridItem,
  Input,
  Formik,
} from '@reapit/elements-legacy'
import Routes from '@/constants/routes'
import qs from 'querystring'
import { selectCustomersList } from '@/selector/customers'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { cleanObject } from '@reapit/utils-common'
import { CustomerModel } from '@reapit/foundations-ts-definitions'
import { Loader, PageContainer, Title } from '@reapit/elements'

export type FilterValues = {
  name: string
}

export type OnSearch = (filterValues: FilterValues, { setStatus }: { setStatus: (string) => any }) => void
export type CustomersFilterFormProps = {
  history: History
  filterValues: FilterValues
  onSearch: OnSearch
}

export const generateFilterValues = (queryParams: URLSearchParams): FilterValues => {
  const name = queryParams.get('name') ?? ''
  return { name }
}

export const onPageChangeHandler = (history: History<any>, queryParams: URLSearchParams) => (page: number) => {
  // remove old page params
  queryParams.delete('page')
  // and insert new page params
  queryParams.append('page', page.toString())
  history.push(`${Routes.CUSTOMERS}?${queryParams.toString()}`)
}

export const onSearchHandler =
  (history: History<any>): OnSearch =>
  (filterValues, { setStatus }) => {
    const query = qs.stringify(cleanObject(filterValues))
    if (!query) {
      setStatus('Please enter at least one search criteria')
      return
    }
    setStatus('')
    const queryString = `${query}`
    history.push(`${Routes.CUSTOMERS}?${queryString}`)
  }

export const refreshForm = (history) => () => {
  history.push(Routes.CUSTOMERS)
}

export const CustomersFilterForm: React.FC<CustomersFilterFormProps> = ({ filterValues, onSearch, history }) => (
  <Formik initialValues={filterValues} onSubmit={onSearch} onReset={refreshForm(history)}>
    {({ status }) => {
      return (
        <Form noValidate={true}>
          <FormSection>
            <Grid className="items-center">
              <GridItem>
                <Input type="text" labelText="Company Name" id="name" name="name" maxLength={256} />
              </GridItem>
              <GridItem className="mt-4">
                <Button type="submit" variant="primary">
                  Search
                </Button>
                <Button type="reset" variant="primary">
                  Refresh
                </Button>
              </GridItem>
            </Grid>
            {status && <p className="has-text-danger">{status}</p>}
          </FormSection>
        </Form>
      )
    }}
  </Formik>
)

export const renderContent = ({
  customerData = [],
  columns,
}: {
  customerData: CustomerModel[] | undefined
  columns: any[]
}) => {
  if (customerData?.length === 0) {
    return <Alert message="No Results " type="info" />
  }
  return (
    <div className="mb-5">
      <Table scrollable={true} loading={false} data={customerData} columns={columns} />
    </div>
  )
}

export const LogoUploadButtonCell = () => {
  return (
    <Button type="button" variant="primary">
      LOGO UPLOAD
    </Button>
  )
}

export const CheckMarkCell = ({ cell: { value } }) => {
  return value ? <FaCheck className="has-text-success" /> : <FaTimes className="has-text-danger" />
}

export const columns = [
  { Header: 'Customer ID', accessor: 'agencyCloudId' },
  { Header: 'Company', accessor: 'name' },
  {
    Header: 'Address',
    accessor: ({ address }) => {
      const {
        buildingName = '',
        buildingNumber = '',
        line1 = '',
        line2 = '',
        line3 = '',
        line4 = '',
        postcode = '',
        countryId = '',
      } = address

      return `${buildingName} ${buildingNumber} ${line1} ${line2} ${line3} ${line4} ${postcode} ${countryId}`
    },
  },
  // TBC
  {
    Header: 'Logo',
    accessor: 'logo',
    Cell: CheckMarkCell,
  },
  // TBC
  {
    Header: '',
    id: 'logoUpload',
    Cell: LogoUploadButtonCell,
  },
]

export const Customers: React.FC = () => {
  const history = useHistory()
  const location = useLocation()
  const { isLoading, data, pageSize, pageNumber, totalCount } = useSelector(selectCustomersList)
  const queryParams = new URLSearchParams(location.search)
  if (isLoading) {
    return <Loader />
  }

  return (
    <ErrorBoundary>
      <PageContainer>
        <Title>Customers</Title>

        <CustomersFilterForm
          onSearch={onSearchHandler(history)}
          filterValues={generateFilterValues(queryParams)}
          history={history}
        />
        <Section hasPadding={false}>
          <div>Total: {totalCount}</div>
        </Section>
        {renderContent({ customerData: data, columns })}
        <Pagination
          onChange={onPageChangeHandler(history, queryParams)}
          totalCount={totalCount}
          pageSize={pageSize}
          pageNumber={pageNumber}
        />
      </PageContainer>
    </ErrorBoundary>
  )
}

export default Customers
