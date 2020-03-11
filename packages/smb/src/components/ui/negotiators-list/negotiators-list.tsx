import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import { ApolloError } from 'apollo-boost'
import { Loader, Cell, Alert, Section, Pagination, Spreadsheet } from '@reapit/elements'
import { getParamsFromPath, stringifyObjectIntoQueryString } from '@/utils/client-url-params'
import { GetNegotiators } from './negotiators-list.graphql'
import {
  PagedResultNegotiatorModel_,
  NegotiatorModel,
} from '@reapit/elements/node_modules/@reapit/foundations-ts-definitions/types'
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
}

const NegotiatorStatusCheckbox = ({ cellRenderProps }) => {
  const {
    row,
    col,
    cell: { value },
  } = cellRenderProps
  const checkBoxId = `${row}-${col}`
  return (
    <div className="field field-checkbox">
      <input id={checkBoxId} className="checkbox" type="checkbox" checked={value} value={value} />
      <label className="label" htmlFor={checkBoxId}>
        IS ACTIVE
      </label>
    </div>
  )
}

export const getDataTable = (data: NegotiatorsQueryResponse): DataTableRow[][] => {
  let dataTable: DataTableRow[][] = [tableHeaders]
  const negotiators: NegotiatorModel[] = data.GetNegotiators?._embedded || []
  const dataRows: DataTableRow[][] = negotiators.map((negotiator: NegotiatorModel) => {
    const { name, jobTitle, email, mobilePhone, officeId, active } = negotiator
    return [
      { value: name },
      { value: jobTitle },
      { value: email },
      { value: mobilePhone },
      { value: officeId },
      { value: active, CustomComponent: NegotiatorStatusCheckbox },
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

export const renderNegotiatorList = ({
  loading,
  error,
  dataTable,
  pageNumber = 0,
  pageSize = 0,
  totalCount = 0,
  handleChangePage,
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

export const NegotiatorList: React.FC<NegotiatorListProps> = () => {
  const location = useLocation()
  const history = useHistory()
  const params = getParamsFromPath(location?.search)
  const page = Number(params?.page) || 1
  const { loading, error, data } = useQuery<NegotiatorsQueryResponse, NegotiatorsQueryParams>(GetNegotiators, {
    variables: { pageSize: NEGOTIATORS_PER_PAGE, pageNumber: page },
    fetchPolicy: 'network-only',
  }) as QueryResult<NegotiatorsQueryResponse, NegotiatorsQueryParams>
  const dataTable = getDataTable(data || { GetNegotiators: { _embedded: [] } })
  return (
    <div>
      {renderNegotiatorList({
        loading,
        error,
        dataTable,
        pageNumber: data?.GetNegotiators?.pageNumber,
        pageSize: data?.GetNegotiators?.pageSize,
        totalCount: data?.GetNegotiators?.totalCount,
        handleChangePage: handleChangePage({ history }),
      })}
    </div>
  )
}

export default NegotiatorList
