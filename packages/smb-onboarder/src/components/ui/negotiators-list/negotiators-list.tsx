import * as React from 'react'
import { ApolloQueryResult, ApolloClient } from 'apollo-boost'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
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
  minLengthValidator,
  Button,
  handleDownloadCsv,
} from '@reapit/elements'
import { getParamsFromPath, stringifyObjectIntoQueryString } from '@/utils/client-url-params'
import GET_NEGOTIATORS from './gql/get-negotiators.graphql'
import UPDATE_NEGOTIATOR from './gql/update-negotiator.graphql'
import CREATE_NEGOTIATOR from './gql/create-negotiator.graphql'
import NegotiatorStatusCheckbox from './negotiator-status-checkbox'
import NegotiatorOfficeSelectbox from './negotiator-office-selectbox'

import { NegotiatorModel, PagedResultNegotiatorModel_, OfficeModel } from '@reapit/foundations-ts-definitions'
import { NEGOTIATORS_PER_PAGE, MAX_ENTITIES_FETCHABLE_AT_ONE_TIME } from '@/constants/paginators'

import GET_OFFICES from '../offices-tab/gql/get-offices.graphql'
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
  updateNegotiatorLoading: boolean
  setErrorServer: React.Dispatch<React.SetStateAction<ErrorData | null>>
  loading: boolean
  error?: ApolloError
  pageNumber?: number
  pageSize?: number
  totalCount?: number
  dataTable: DataTableRow[][]
  handleChangePage: (page: number) => void
  updateNegotiator: () => void
  createNegotiator: () => void
  officeData?: OfficesQueryResponse
}

export const getDataTable = (
  data: NegotiatorsQueryResponse,
  updateNegotiator: (params) => void,
  updateNegotiatorLoading: boolean,
  createNegotiator: (params) => void,
  officeData?: OfficesQueryResponse,
): DataTableRow[][] => {
  let dataTable: DataTableRow[][] = [tableHeaders]
  const negotiators: NegotiatorModel[] = data.GetNegotiators?._embedded || []

  const StatusCheckbox = props => {
    const { cellRenderProps, data, setData } = props
    return (
      <NegotiatorStatusCheckbox
        cellRenderProps={cellRenderProps}
        data={data}
        setData={setData}
        updateNegotiator={updateNegotiator}
        disabled={updateNegotiatorLoading}
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
      { fixedReadOnly: true, readOnly: true, value: office?.name, CustomComponent: OfficeSelectbox },
      { fixedReadOnly: true, readOnly: true, value: active, CustomComponent: StatusCheckbox },
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
        return !fieldValidateRequire(cell.value as string) && minLengthValidator(5)(cell.value as string)
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

export const prepareUpdateNegeotiatorParams = (data: Cell[][], rowIndex) => {
  const selectedRow = data[rowIndex]
  const name = selectedRow[0].value
  const jobTitle = selectedRow[1].value
  const email = selectedRow[2].value
  const mobilePhone = selectedRow[3].value
  const active = selectedRow[5].value
  const id = selectedRow[6].value
  const _eTag = selectedRow[7].value
  return {
    id,
    _eTag,
    name,
    jobTitle,
    active,
    mobilePhone,
    email,
  }
}

export const prepareCreateNegeotiatorParams = (data: Cell[][], rowIndex) => {
  const selectedRow = data[rowIndex]
  const name = selectedRow[0].value
  const jobTitle = selectedRow[1].value
  const email = selectedRow[2].value
  const mobilePhone = selectedRow[3].value
  const officeId = selectedRow[4].value
  let active = false
  if (selectedRow[5].value) {
    active = true
  }
  return {
    name,
    jobTitle,
    active,
    officeId,
    mobilePhone,
    email,
  }
}

export const handleAfterCellsChanged = (updateNegotiator, createNegotiator) => {
  return (changes: ChangedCells, data: Cell[][]) => {
    const selectedRow = data[changes[0].row]
    const selectedCell = selectedRow[changes[0].col]
    if (!selectedCell.isValidated) {
      return
    }
    const id = selectedRow[6].value
    const _eTag = selectedRow[7].value
    const office = selectedRow[4].value
    const officeId = office?.split('|')[0]
    const officeName = office?.split('|')[1]

    const isEditMode = id && _eTag
    if (isEditMode) {
      const updateNegotiatorVariables = prepareUpdateNegeotiatorParams(data, changes[0].row)
      updateNegotiator({
        variables: updateNegotiatorVariables,
        optimisticResponse: {
          UpdateNegotiator: {
            ...updateNegotiatorVariables,
            __typename: 'NegotiatorModel',
          },
        },
      })
      return
    }

    const isValid = selectedRow.every(item => item.isValidated)
    if (!isValid) {
      return
    }
    const createNegotiatorVariables = prepareCreateNegeotiatorParams(data, changes[0].row)
    createNegotiator({
      variables: createNegotiatorVariables,
      optimisticResponse: {
        __typename: 'Mutation',
        CreateNegotiator: {
          ...createNegotiatorVariables,
          id: Math.random(),
          created: new Date().toISOString,
          modified: new Date().toISOString,
          workPhone: null,
          metadata: null,
          _eTag: null,
          _links: null,
          _embedded: {
            office: {
              id: officeId,
              name: officeName,
            },
          },
          __typename: 'NegotiatorModel',
        },
      },
    })
  }
}

export interface CreateDownLoadButtonOnClickFnParams {
  totalCount: number
  client: ApolloClient<any>
  setIsDownloading: React.Dispatch<React.SetStateAction<boolean>>
  setErrorServer: React.Dispatch<React.SetStateAction<ErrorData | null>>
  updateNegotiator: (params) => void
  updateNegotiatorLoading: boolean
  createNegotiator: (params) => void
  officeData?: OfficesQueryResponse
}

export const createDownLoadButtonOnClickFn = ({
  totalCount = 0,
  client,
  setIsDownloading,
  setErrorServer,
  updateNegotiator,
  updateNegotiatorLoading,
  createNegotiator,
  officeData,
}: CreateDownLoadButtonOnClickFnParams) => () => {
  const fetchPages = Math.ceil(totalCount / MAX_ENTITIES_FETCHABLE_AT_ONE_TIME)

  setIsDownloading(true)
  /**
   * API currenlty only allow to fetch 100 items each time using pageSize
   * This func fetch Nth times based on totalCount parameter
   */
  const promises: Promise<ApolloQueryResult<NegotiatorsQueryResponse>>[] = []
  for (let i = 1; i <= fetchPages; i++) {
    promises.push(
      client.query<NegotiatorsQueryResponse, NegotiatorsQueryParams>({
        query: GET_NEGOTIATORS,
        variables: { pageSize: MAX_ENTITIES_FETCHABLE_AT_ONE_TIME, pageNumber: i, embed: ['office'] },
      }),
    )
  }

  Promise.all(promises)
    .then(results => {
      const mergedEmbed = results.reduce<any[]>((mergedArr, result) => {
        const getOfficesEmbedded = (result.data?.GetNegotiators?._embedded || []) as any[]
        mergedArr.push(...getOfficesEmbedded)
        return mergedArr
      }, [])

      const dataTable = getDataTable(
        { GetNegotiators: { _embedded: mergedEmbed || [] } },
        updateNegotiator,
        updateNegotiatorLoading,
        createNegotiator,
        officeData,
      )
      handleDownloadCsv(dataTable as Cell[][], window, document)()
    })
    .catch(err => {
      setErrorServer({
        type: 'SERVER',
        message: err.message,
      })
    })
    .finally(() => {
      setIsDownloading(false)
    })
}

export const CustomDownButton = ({
  totalCount,
  setErrorServer,
  officeData,
  updateNegotiatorLoading,
  updateNegotiator,
  createNegotiator,
}: {
  totalCount: number
  setErrorServer: React.Dispatch<React.SetStateAction<ErrorData | null>>
  updateNegotiator: (params) => void
  updateNegotiatorLoading: boolean
  createNegotiator: (params) => void
  officeData?: OfficesQueryResponse
}) => {
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false)
  const client = useApolloClient()
  const downloadButtonOnClick = createDownLoadButtonOnClickFn({
    totalCount,
    setIsDownloading,
    client,
    setErrorServer,
    officeData,
    updateNegotiatorLoading,
    updateNegotiator,
    createNegotiator,
  })

  return (
    <div className="download-button">
      <Button loading={isDownloading} type="submit" variant="info" onClick={downloadButtonOnClick}>
        Download file
      </Button>
    </div>
  )
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
  setErrorServer,
  officeData,
  updateNegotiatorLoading,
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
        CustomDownButton={
          <CustomDownButton
            updateNegotiatorLoading={updateNegotiatorLoading}
            updateNegotiator={updateNegotiator}
            createNegotiator={createNegotiator}
            officeData={officeData}
            setErrorServer={setErrorServer}
            totalCount={totalCount}
          />
        }
        allowOnlyOneValidationErrorPerRow={true}
        data={dataTable as Cell[][]}
        afterCellsChanged={handleAfterCellsChanged(updateNegotiator, createNegotiator)}
        validate={validate}
      />
      <Section>
        <Pagination pageNumber={pageNumber} pageSize={pageSize} totalCount={totalCount} onChange={handleChangePage} />
      </Section>
    </React.Fragment>
  )
}

export const handleErrorMessageUseEffect = (createNegotiatorError, updateNegotiatorError, setErrorServer) => {
  return () => {
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
  }
}

export const NegotiatorList: React.FC<NegotiatorListProps> = () => {
  const [serverError, setErrorServer] = React.useState<ErrorData | null>(null)
  const [componentError, setErrorComponent] = React.useState<ErrorData | null>(null)
  const location = useLocation()
  const history = useHistory()
  const params = getParamsFromPath(location?.search)
  const page = Number(params?.page) || 1
  const [updateNegotiator, { error: updateNegotiatorError, loading: updateNegotiatorLoading }] = useMutation(
    UPDATE_NEGOTIATOR,
  )

  const { loading, error: getNegotiatorsError, data: negotiatorData } = useQuery<
    NegotiatorsQueryResponse,
    NegotiatorsQueryParams
  >(GET_NEGOTIATORS, {
    variables: { pageSize: NEGOTIATORS_PER_PAGE, pageNumber: page, embed: ['office'] },
  }) as QueryResult<NegotiatorsQueryResponse, NegotiatorsQueryParams>

  const [createNegotiator, { error: createNegotiatorError }] = useMutation(CREATE_NEGOTIATOR, {
    update(cache, response) {
      const createNegotiatorResponse: CreateNegotiatorMutationResponse = response.data
      const data: NegotiatorsQueryResponse = cache.readQuery({
        query: GET_NEGOTIATORS,
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
        query: GET_NEGOTIATORS,
        data: {
          GetNegotiators: {
            __typename: 'PagedResultNegotiatorModel',
            _embedded: existingNegotiators?.concat([addedNegotiator]),
            pageNumber,
            pageSize,
            pageCount,
            totalCount,
            _links,
          },
        },
        variables: {
          pageSize: NEGOTIATORS_PER_PAGE,
          pageNumber: page,
          embed: ['office'],
        },
      })
    },
  })

  const { data: officeData } = useQuery<OfficesQueryResponse, OfficesQueryParams>(GET_OFFICES, {
    variables: { pageSize: NEGOTIATORS_PER_PAGE, pageNumber: 1 },
  }) as QueryResult<OfficesQueryResponse, OfficesQueryParams>

  React.useEffect(handleErrorMessageUseEffect(createNegotiatorError, updateNegotiatorError, setErrorServer), [
    createNegotiatorError,
    updateNegotiatorError,
  ])

  const errorClearedComponent = () => {
    setErrorComponent(null)
  }

  const errorClearedServer = () => {
    setErrorServer(null)
  }

  const dataTable = getDataTable(
    negotiatorData || { GetNegotiators: { _embedded: [] } },
    updateNegotiator,
    updateNegotiatorLoading,
    createNegotiator,
    officeData,
  )

  return (
    <div>
      {renderNegotiatorList({
        updateNegotiatorLoading,
        setErrorServer,
        loading,
        error: getNegotiatorsError,
        dataTable,
        pageNumber: negotiatorData?.GetNegotiators?.pageNumber,
        pageSize: negotiatorData?.GetNegotiators?.pageSize,
        totalCount: negotiatorData?.GetNegotiators?.totalCount,
        handleChangePage: handleChangePage({ history }),
        updateNegotiator: updateNegotiator,
        createNegotiator: createNegotiator,
        officeData,
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
