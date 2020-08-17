import React from 'react'
import { History } from 'history'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useHistory, useLocation } from 'react-router'
import ErrorBoundary from '@/components/hocs/error-boundary'
import {
  Pagination,
  Table,
  Button,
  Loader,
  setQueryParams,
  Helper,
  H3,
  isEmptyObject,
  Section,
  Form,
  FormSection,
  Grid,
  GridItem,
  Input,
  Formik,
} from '@reapit/elements'
import Routes from '@/constants/routes'
import { fetchDeveloperList, fetchDeveloperListValues } from '@/actions/devs-management'
import qs from 'querystring'
import { Dispatch } from 'redux'
import { cleanObject } from '@reapit/utils'
import { selectCustomersList } from '@/selector/customers'

export type FilterValues = {
  name: string
}

export type CustomersFilterFormProps = {
  filterValues: FilterValues
  onSearch: (history: History) => void
}

export const generateFilterValues = (queryParams: URLSearchParams) => (): CustomersFilterFormProps => {
  const name = queryParams.get('name') || ''
  return { name }
}

export const onPageChangeHandler = (history: History<any>, queryParams: URLSearchParams) => (page: number) => {
  // remove old page params
  queryParams.delete('page')
  // and insert new page params
  queryParams.append('page', page)
  history.push(`${Routes.CUSTOMERS}?${queryParams.toString()}`)
}

export const onSearchHandler = (history: History<any>) => (filterValues: FilterValues, { setStatus }) => {
  const query = qs.stringify(filterValues)
  if (!query) {
    setStatus('Please enter at least one search criteria')
    return
  }
  const queryString = `page=1&${query}`
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

export const Customers: React.FC = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const { isLoading, data, pageSize, pageNumber, totalCount } = useSelector(selectCustomersList)
  const queryParams = new URLSearchParams(location.search)

  const LogoUploadButtonCell = () => {
    return (
      <Button type="button" variant="primary">
        LOGO UPLOAD
      </Button>
    )
  }

  const columns = [
    { Header: 'Customer ID', accessor: 'agencyCloudId' },
    { Header: 'Company', accessor: 'name' },
    { Header: 'Address', accessor: 'jobTitle' },
    // TBC
    { Header: 'Logo', accessor: 'logo' },
    // TBC
    {
      Header: '',
      id: 'logoUpload',
      Cell: LogoUploadButtonCell,
    },
  ]

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
