import * as React from 'react'
import { ApolloError } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import { Loader, Spreadsheet, Cell, Alert } from '@reapit/elements'
import { Offices, PagedResultOfficeModel_, OfficeModel } from '@reapit/foundations-ts-definitions'
import { OFFICES } from './offices-tab.graphql'

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
  { readOnly: true, value: 'Fax' },
  { readOnly: true, value: 'Email' },
]

export type OfficesTabProps = {}

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
  dataTable: DataTableRow[][]
}

export const renderContent = ({ loading, error, dataTable }: RenderContentParams) => {
  if (loading) {
    return <Loader />
  }
  if (error) {
    return <Alert message={error.message} type="danger" />
  }
  return (
    <Spreadsheet
      data={dataTable as Cell[][]}
      description={
        <p>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        </p>
      }
    />
  )
}

export const OfficesTab: React.FC<OfficesTabProps> = () => {
  const { loading, error, data } = useQuery<OfficesQueryResponse, Offices>(OFFICES, {
    variables: { PageSize: 100, PageNumber: 1 },
  }) as QueryResult<OfficesQueryResponse, Offices>

  const dataTable = getDataTable(data || { GetOffices: { _embedded: [] } })

  return <div>{renderContent({ loading, error, dataTable })}</div>
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
    { value: office.email },
  ])
  dataTable = [tableHeaders, ...dataRows]
  return dataTable
}

export default OfficesTab
