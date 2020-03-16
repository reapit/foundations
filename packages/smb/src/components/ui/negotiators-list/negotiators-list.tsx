import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import { ApolloError } from 'apollo-boost'
import {
  Loader,
  Cell,
  Alert,
  Section,
  Pagination,
  Spreadsheet,
  ChangedCells,
  fieldValidateRequire,
  isEmail,
  isNumberOnly,
} from '@reapit/elements'
import { getParamsFromPath, stringifyObjectIntoQueryString } from '@/utils/client-url-params'
import { GetNegotiators, UpdateNegotiator } from './negotiators.graphql'
import NegotiatorStatusCheckbox from './negotiator-status-checkbox'
import NegotiatorOfficeSelectbox from './negotiator-office-selectbox'

import { NegotiatorModel, PagedResultNegotiatorModel_, OfficeModel } from '@reapit/foundations-ts-definitions'
import { NEGOTIATORS_PER_PAGE } from '@/constants/paginators'

import { OFFICES } from '../offices-tab/offices-tab.graphql'
import { OfficesQueryResponse, OfficesQueryParams } from '../offices-tab/offices-tab'

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

export const getDataTable = (data: NegotiatorsQueryResponse, officeData?: OfficesQueryResponse): DataTableRow[][] => {
  let dataTable: DataTableRow[][] = [tableHeaders]
  const negotiators: NegotiatorModel[] = data.GetNegotiators?._embedded || []

  const StatusCheckbox = props => {
    const { cellRenderProps, data: sheetData } = props
    return <NegotiatorStatusCheckbox cellRenderProps={cellRenderProps} data={sheetData} />
  }

  const OfficeSelectbox = props => {
    const { cellRenderProps } = props
    return <NegotiatorOfficeSelectbox cellRenderProps={cellRenderProps} data={officeData} />
  }

  const dataRows: DataTableRow[][] = negotiators.map((negotiator: NegotiatorModel) => {
    const { name, jobTitle, email, mobilePhone, active, id, _eTag, _embedded } = negotiator
    const office: OfficeModel = _embedded?.office
    return [
      { value: name },
      { value: jobTitle },
      { value: email },
      { value: mobilePhone },
      { readOnly: true, value: office?.id, CustomComponent: OfficeSelectbox },
      { disableEvents: true, value: active, CustomComponent: StatusCheckbox },
      { value: id, className: 'hidden' },
      { value: _eTag, className: 'hidden' },
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

export const validate = (data: Cell[][]) =>
  data.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      if (rowIndex === 0) return true // dont need to validate header row
      // cell name is required
      if (cellIndex === 0) {
        return !fieldValidateRequire(cell.value as string)
      }
      // cell email is required
      if (cellIndex === 2) {
        return !fieldValidateRequire(cell.value as string) && isEmail(cell.value as string)
      }
      // cell telephone is required
      if (cellIndex === 3) {
        return !fieldValidateRequire(cell.value as string) && isNumberOnly(cell.value)
      }
      return true
    }),
  )

export const handleAfterCellsChanged = updateNegotiator => {
  return (changes: ChangedCells, data: Cell[][]) => {
    const selectedRow = data[changes[0].row]
    const selectedCell = selectedRow[changes[0].col]
    if (!selectedCell.isValidated) {
      return
    }
    const name = selectedRow[0].value
    const jobTitle = selectedRow[1].value
    const email = selectedRow[2].value
    const mobilePhone = selectedRow[3].value
    const active = selectedRow[5].value
    const id = selectedRow[6].value
    const _eTag = selectedRow[7].value

    const isEditMode = id && _eTag
    if (isEditMode) {
      const updateNegotiatorVariables = {
        id,
        _eTag,
        name,
        jobTitle,
        active,
        mobilePhone,
        email,
      }
      updateNegotiator({
        variables: updateNegotiatorVariables,
        optimisticResponse: {
          UpdateNegotiator: {
            ...updateNegotiatorVariables,
            __typename: 'NegotiatorModel',
          },
        },
      })
    } else {
      const isValid = selectedRow.every(item => item.isValidated)
      console.log('isValid', isValid)
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
        afterCellsChanged={handleAfterCellsChanged(updateNegotiator)}
        validate={validate}
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
    },
  ) as QueryResult<NegotiatorsQueryResponse, NegotiatorsQueryParams>

  const { data: officeData } = useQuery<OfficesQueryResponse, OfficesQueryParams>(OFFICES, {
    variables: { pageSize: 100, pageNumber: 1 },
  }) as QueryResult<OfficesQueryResponse, OfficesQueryParams>

  const dataTable = getDataTable(negotiatorData || { GetNegotiators: { _embedded: [] } }, officeData)
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
