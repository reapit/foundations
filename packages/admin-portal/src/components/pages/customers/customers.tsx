import React from 'react'
import { History } from 'history'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Button,
  Loader,
  Helper,
  H3,
  Section,
  Form,
  FormSection,
  Grid,
  GridItem,
  Input,
  Formik,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import qs from 'querystring'
import { selectCustomersList } from '@/selector/customers'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { cleanObject } from '@reapit/utils'

export type FilterValues = {
  name: string
}

export type OnSearch = (filterValues: FilterValues, { setStatus }: { setStatus: (string) => any }) => void
export type CustomersFilterFormProps = {
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

export const onSearchHandler = (history: History<any>): OnSearch => (filterValues, { setStatus }) => {
  const query = qs.stringify(cleanObject(filterValues))
  if (!query) {
    setStatus('Please enter at least one search criteria')
    return
  }
  setStatus('')
  const queryString = `${query}`
  history.push(`${Routes.CUSTOMERS}?${queryString}`)
}

export const CustomersFilterForm: React.FC<CustomersFilterFormProps> = ({ filterValues, onSearch }) => (
  <Formik initialValues={filterValues} onSubmit={onSearch}>
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
              </GridItem>
            </Grid>
            {status && <p className="has-text-danger">{status}</p>}
          </FormSection>
        </Form>
      )
    }}
  </Formik>
)

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

const columns = [
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

  if (!isLoading && data?.length === 0) {
    return (
      <React.Fragment>
        <Helper variant="info">
          Unfortunately, there are no results that match your search criteria, please try again
        </Helper>
        <Link className="text-center" to={Routes.CUSTOMERS}>
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
        <H3>Customers</H3>
      </Section>
      <CustomersFilterForm onSearch={onSearchHandler(history)} filterValues={generateFilterValues(queryParams)} />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Section>
            <Table scrollable={true} loading={false} data={data || []} columns={columns} />
          </Section>
          <Section>
            <div>Total: {totalCount}</div>
          </Section>
          <Pagination
            onChange={onPageChangeHandler(history, queryParams)}
            totalCount={totalCount}
            pageSize={pageSize}
            pageNumber={pageNumber}
          />
        </>
      )}
    </ErrorBoundary>
  )
}

export default Customers
