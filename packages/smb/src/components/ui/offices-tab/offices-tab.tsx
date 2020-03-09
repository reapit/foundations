import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { ApolloError } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import { Loader, Cell, Alert, Section, Pagination, Spreadsheet } from '@reapit/elements'
import { PagedResultOfficeModel_, OfficeModel } from '@reapit/foundations-ts-definitions'
import { OFFICES } from './offices-tab.graphql'
import { OFFICES_PER_PAGE } from '@/constants/paginators'

export const tableHeaders: DataTableRow[] = [
  { readOnly: true, value: 'Office Name' },
  { readOnly: true, value: 'Building Name' },
  { readOnly: true, value: 'Building No.' },
  { readOnly: true, value: 'Address 1' },
  { readOnly: true, value: 'Address 2' },
  { readOnly: true, value: 'Address 3' },
  { readOnly: true, value: 'Address 4' },
  { readOnly: true, value: 'Post Code' },
  { readOnly: true, value: 'Telephone' },
  { readOnly: true, value: 'Email' },
]

export type OfficesTabProps = {}

export interface OfficesQueryParams {
  pageSize: number
  pageNumber: number
  sortBy?: string
  id?: string[]
  address?: string
  name?: string
}

export type OfficesQueryResponse = {
  GetOffices?: PagedResultOfficeModel_
}

export type DataTableRow = {
  value?: string
  readOnly?: boolean
}

export type RenderContentParams = {
  loading: boolean
  error?: ApolloError
  pageNumber?: number
  pageSize?: number
  totalCount?: number
  dataTable: DataTableRow[][]
  handleChangePage: (page: number) => void
}

export const renderContent = ({
  loading,
  error,
  dataTable,
  pageNumber = 0,
  pageSize = 0,
  totalCount = 0,
  handleChangePage,
}: RenderContentParams) => {
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <Alert message={error.message} type="danger" />
  }
  return (
    <React.Fragment>
      <Spreadsheet
        data={dataTable as Cell[][]}
        description={
          <p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type
              and scrambled it to make a type specimen book.
            </p>
          </p>
        }
      />
      <Section>
        <Pagination pageNumber={pageNumber} pageSize={pageSize} totalCount={totalCount} onChange={handleChangePage} />
      </Section>
    </React.Fragment>
  )
}

export const handleChangePage = ({ history }) => (pageNumber: number) => {
  const searchParams = queryString.stringify({
    page: pageNumber,
  })
  history.push({
    search: searchParams,
  })
}

export const OfficesTab: React.FC<OfficesTabProps> = () => {
  const location = useLocation()
  const history = useHistory()
  const params = queryString.parse(location?.search)
  const page = Number(params?.page) || 1
  const { loading, error, data } = useQuery<OfficesQueryResponse, OfficesQueryParams>(OFFICES, {
    variables: { pageSize: OFFICES_PER_PAGE, pageNumber: page },
    fetchPolicy: 'network-only',
  }) as QueryResult<OfficesQueryResponse, OfficesQueryParams>

  const dataTable = getDataTable(data || { GetOffices: { _embedded: [] } })

  return (
    <div>
      {renderContent({
        loading,
        error,
        dataTable,
        pageNumber: data?.GetOffices?.pageNumber,
        pageSize: data?.GetOffices?.pageSize,
        totalCount: data?.GetOffices?.totalCount,
        handleChangePage: handleChangePage({ history }),
      })}
    </div>
  )
}

export function getDataTable(data: OfficesQueryResponse): DataTableRow[][] {
  let dataTable: DataTableRow[][] = [tableHeaders]
  const offices: OfficeModel[] = data.GetOffices?._embedded || []
  const dataRows: DataTableRow[][] = offices.map((office: OfficeModel) => [
    { value: office.name },
    { value: office.address?.buildingName },
    { value: office.address?.buildingNumber },
    { value: office.address?.line1 },
    { value: office.address?.line2 },
    { value: office.address?.line3 },
    { value: office.address?.line4 },
    { value: office.address?.postcode },
    { value: office.workPhone },
    { value: office.email },
  ])
  dataTable = [tableHeaders, ...dataRows]
  return dataTable
}

export default OfficesTab
