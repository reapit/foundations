import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import { ApolloError } from 'apollo-boost'
import {
  Toast,
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
  ErrorData,
} from '@reapit/elements'
import { getParamsFromPath, stringifyObjectIntoQueryString } from '@/utils/client-url-params'
import { GetNegotiators, UpdateNegotiator, CreateNegotiator } from './negotiators.graphql'
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

export interface NegotiatorUpdateParams {
  id: string
  _eTag: string
  name: string
  jobTitle?: string
  active: boolean
  mobilePhone: string
  email: string
}

export interface NegotiatorCreateParams {
  name: string
  jobTitle?: string
  active: boolean
  officeId: string
  mobilePhone: string
  email: string
}

export type NegotiatorsQueryResponse = {
  GetNegotiators?: PagedResultNegotiatorModel_
}

export type CreateNegotiatorMutationResponse = {
  CreateNegotiator: NegotiatorModel
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
  createNegotiator: () => void
}

export const getDataTable = (
  data: NegotiatorsQueryResponse,
  updateNegotiator: (params) => void,
  createNegotiator: (params) => void,
  officeData?: OfficesQueryResponse,
): DataTableRow[][] => {
  let dataTable: DataTableRow[][] = [tableHeaders]
  const negotiators: NegotiatorModel[] = data.GetNegotiators?._embedded || []

  const StatusCheckbox = props => {
    const { cellRenderProps, data } = props
    return (
      <NegotiatorStatusCheckbox
        cellRenderProps={cellRenderProps}
        data={data}
        updateNegotiator={updateNegotiator}
        createNegotiator={createNegotiator}
      />
    )
  }

  const OfficeSelectbox = props => {
    const { cellRenderProps, data } = props
    return (
      <NegotiatorOfficeSelectbox
        cellRenderProps={cellRenderProps}
        officeData={officeData}
        spreadsheetData={data}
        createNegotiator={createNegotiator}
      />
    )
  }

  const dataRows: DataTableRow[][] = negotiators.map((negotiator: NegotiatorModel) => {
    const { name, jobTitle, email, mobilePhone, active, id, _eTag, _embedded } = negotiator
    const office: OfficeModel = _embedded?.office
    return [
      { value: name },
      { value: jobTitle },
      { value: email },
      { value: mobilePhone },
      { readOnly: true, value: `${office?.id}|${office?.name}`, CustomComponent: OfficeSelectbox },
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
      // Office is required
      if (cellIndex === 4) {
        return !fieldValidateRequire(cell.value as string)
      }
      return true
    }),
  )

export const handleAfterCellsChanged = (updateNegotiator, createNegotiator) => {
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
    const officeId = selectedRow[4].value
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
      if (isValid) {
        const createNegotiatorVariables = {
          name,
          jobTitle,
          active,
          officeId,
          mobilePhone,
          email,
        }
        createNegotiator({
          variables: createNegotiatorVariables,
        })
      }
    }
  }
}

export const updateApolloCacheAfterCreateNegotiator = (cache, response, page) => {
  const createNegotiatorResponse: CreateNegotiatorMutationResponse = response.data
  const data: NegotiatorsQueryResponse = cache.readQuery({
    query: GetNegotiators,
    variables: {
      pageSize: NEGOTIATORS_PER_PAGE,
      pageNumber: page,
      embed: ['office'],
    },
  }) || { GetNegotiators: { _embedded: [] } }

  const { _embedded: existingNegotiators, pageNumber, pageSize, pageCount, totalCount, _links } =
    data.GetNegotiators || {}

  const addedNegotiator = {
    ...createNegotiatorResponse.CreateNegotiator,
    __typename: 'NegotiatorModel',
  }

  cache.writeQuery({
    query: GetNegotiators,
    data: {
      GetNegotiators: {
        __typename: 'PagedResultNegotiatorModel',
        _embedded: existingNegotiators?.concat([addedNegotiator]),
        pageNumber,
        pageSize,
        pageCount,
        totalCount: totalCount || 0 + 1,
        _links,
      },
    },
    variables: {
      pageSize: NEGOTIATORS_PER_PAGE,
      pageNumber: page,
      embed: ['office'],
    },
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
  updateNegotiator,
  createNegotiator,
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
        afterCellsChanged={handleAfterCellsChanged(updateNegotiator, createNegotiator)}
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
  const [serverError, setErrorServer] = React.useState<ErrorData | null>(null)
  const [componentError, setErrorComponent] = React.useState<ErrorData | null>(null)
  const location = useLocation()
  const history = useHistory()
  const params = getParamsFromPath(location?.search)
  const page = Number(params?.page) || 1
  const [updateNegotiator, { error: updateNegotiatorError }] = useMutation(UpdateNegotiator)

  const { loading, error: getNegotiatorsError, data: negotiatorData } = useQuery<
    NegotiatorsQueryResponse,
    NegotiatorsQueryParams
  >(GetNegotiators, {
    variables: { pageSize: NEGOTIATORS_PER_PAGE, pageNumber: page, embed: ['office'] },
  }) as QueryResult<NegotiatorsQueryResponse, NegotiatorsQueryParams>

  const [createNegotiator, { error: createNegotiatorError }] = useMutation(CreateNegotiator, {
    update(cache, response) {
      updateApolloCacheAfterCreateNegotiator(cache, response, page)
    },
  })

  const { data: officeData } = useQuery<OfficesQueryResponse, OfficesQueryParams>(OFFICES, {
    variables: { pageSize: 100, pageNumber: 1 },
  }) as QueryResult<OfficesQueryResponse, OfficesQueryParams>

  React.useEffect(() => {
    if (createNegotiatorError) {
      setErrorServer({
        type: 'SERVER',
        message: createNegotiatorError.message,
      })
    }
    if (updateNegotiatorError) {
      setErrorServer({
        type: 'SERVER',
        message: updateNegotiatorError.message,
      })
    }
  }, [createNegotiatorError, updateNegotiatorError])

  const errorClearedComponent = () => {
    setErrorComponent(null)
  }

  const errorClearedServer = () => {
    setErrorServer(null)
  }

  const dataTable = getDataTable(
    negotiatorData || { GetNegotiators: { _embedded: [] } },
    updateNegotiator,
    createNegotiator,
    officeData,
  )
  return (
    <div>
      {renderNegotiatorList({
        loading,
        error: getNegotiatorsError,
        dataTable,
        pageNumber: negotiatorData?.GetNegotiators?.pageNumber,
        pageSize: negotiatorData?.GetNegotiators?.pageSize,
        totalCount: negotiatorData?.GetNegotiators?.totalCount,
        handleChangePage: handleChangePage({ history }),
        updateNegotiator: updateNegotiator,
        createNegotiator: createNegotiator,
      })}
      <Toast
        componentError={componentError}
        serverError={serverError}
        errorClearedComponent={errorClearedComponent}
        errorClearedServer={errorClearedServer}
      />
    </div>
  )
}

export default NegotiatorList
