import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import { ApolloError } from 'apollo-boost'
import { Loader, Cell, Alert, Section, Pagination, Spreadsheet, ChangedCells } from '@reapit/elements'
import { getParamsFromPath, stringifyObjectIntoQueryString } from '@/utils/client-url-params'
import { GetNegotiators, UpdateNegotiator } from './negotiators.graphql'
import NegotiatorStatusCheckbox from './negotiator-status-checkbox'

import { NegotiatorModel, PagedResultNegotiatorModel_, OfficeModel } from '@reapit/foundations-ts-definitions'
import { NEGOTIATORS_PER_PAGE } from '@/constants/paginators'

export const tableHeaders: DataTableRow[] = [
  { readOnly: true, value: 'Username' },
  { readOnly: true, value: 'Job Title' },
  { readOnly: true, value: 'Email Address' },
  { readOnly: true, value: 'Telephone' },
  { readOnly: true, value: 'Office' },
  { readOnly: true, value: 'Status' },
]

export type DataTableRow = {
  value?: string | boolean
  readOnly?: boolean
}

export type NegotiatorListProps = {}

export interface NegotiatorsQueryParams {
  pageSize: number
  pageNumber: number
  sortBy?: string
  id?: string[]
  officeId?: string[]
  name?: string
  embed?: string[]
}

export type NegotiatorsQueryResponse = {
  GetNegotiators?: PagedResultNegotiatorModel_
}

export type RenderNegotiatorListParams = {
  loading: boolean
  error?: ApolloError
  pageNumber?: number
  pageSize?: number
  totalCount?: number
  dataTable: DataTableRow[][]
  handleChangePage: (page: number) => void
  updateNegotiator: () => void
}

export const getDataTable = (data: NegotiatorsQueryResponse): DataTableRow[][] => {
  let dataTable: DataTableRow[][] = [tableHeaders]
  const negotiators: NegotiatorModel[] = data.GetNegotiators?._embedded || []

  const StatusCheckbox = props => {
    const { cellRenderProps, data: sheetData } = props
    return <NegotiatorStatusCheckbox cellRenderProps={cellRenderProps} data={sheetData} />
  }

  const dataRows: DataTableRow[][] = negotiators.map((negotiator: NegotiatorModel) => {
    const { name, jobTitle, email, mobilePhone, active, id, _eTag, _embedded } = negotiator
    const office: OfficeModel = _embedded?.office
    return [
      { value: name },
      { value: jobTitle },
      { value: email },
      { value: mobilePhone },
      { readOnly: true, value: office.name },
      { disableEvents: true, value: active, CustomComponent: StatusCheckbox },
      { value: id },
      { value: _eTag },
    ]
  })
  dataTable = [tableHeaders, ...dataRows]
  return dataTable
}

export const handleChangePage = ({ history }) => (pageNumber: number) => {
  const searchParams = stringifyObjectIntoQueryString({
    page: pageNumber,
  })
  history.push({
    search: searchParams,
  })
}

export const handleSpreadSheetDataChanged = updateNegotiator => {
  return (data: Cell[][], changedCells: ChangedCells) => {
    console.log('handleSpreadSheetDataChanged -> changedCells', changedCells)
    if (changedCells.length === 1) {
      const selectedRow = data[changedCells[0].row]
      console.log('handleSpreadSheetDataChanged -> selectedRow', selectedRow)
      const name = selectedRow[0].value
      const jobTitle = selectedRow[1].value
      const email = selectedRow[2].value
      const mobilePhone = selectedRow[3].value
      const active = selectedRow[5].value
      const id = selectedRow[6].value
      const _eTag = selectedRow[7].value
      updateNegotiator({
        variables: {
          id,
          _eTag,
          name,
          jobTitle,
          active,
          mobilePhone,
          email,
        },
      })
    }
  }
}

export const renderNegotiatorList = ({
  loading,
  error,
  dataTable,
  pageNumber = 0,
  pageSize = 0,
  totalCount = 0,
  handleChangePage,
  updateNegotiator,
}: RenderNegotiatorListParams) => {
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
        afterDataChanged={handleSpreadSheetDataChanged(updateNegotiator)}
        description={
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
            industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
        }
      />
      <Section>
        <Pagination pageNumber={pageNumber} pageSize={pageSize} totalCount={totalCount} onChange={handleChangePage} />
      </Section>
    </React.Fragment>
  )
}

export const NegotiatorList: React.FC<NegotiatorListProps> = () => {
  const location = useLocation()
  const history = useHistory()
  const params = getParamsFromPath(location?.search)
  const page = Number(params?.page) || 1
  const [updateNegotiator] = useMutation(UpdateNegotiator)
  const { loading, error, data: negotiatorData } = useQuery<NegotiatorsQueryResponse, NegotiatorsQueryParams>(
    GetNegotiators,
    {
      variables: { pageSize: NEGOTIATORS_PER_PAGE, pageNumber: page, embed: ['office'] },
      fetchPolicy: 'network-only',
    },
  ) as QueryResult<NegotiatorsQueryResponse, NegotiatorsQueryParams>
  const dataTable = getDataTable(negotiatorData || { GetNegotiators: { _embedded: [] } })
  return (
    <div>
      {renderNegotiatorList({
        loading,
        error,
        dataTable,
        pageNumber: negotiatorData?.GetNegotiators?.pageNumber,
        pageSize: negotiatorData?.GetNegotiators?.pageSize,
        totalCount: negotiatorData?.GetNegotiators?.totalCount,
        handleChangePage: handleChangePage({ history }),
        updateNegotiator: updateNegotiator,
      })}
    </div>
  )
}

export default NegotiatorList
