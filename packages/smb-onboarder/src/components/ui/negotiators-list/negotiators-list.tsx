import * as React from 'react'
import { ApolloQueryResult, ApolloClient } from 'apollo-boost'
import { useLocation, useHistory } from 'react-router-dom'
import { useQuery, useMutation, useApolloClient } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import { ApolloError } from 'apollo-boost'
import {
  Loader,
  Cell,
  Section,
  Pagination,
  Spreadsheet,
  ChangedCells,
  fieldValidateRequire,
  isEmail,
  isNumberOnly,
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
import errorMessages from '@/constants/error-messages'

export const tableHeaders: DataTableRow[] = [
  { readOnly: true, value: 'Username' },
  { readOnly: true, value: 'Job Title' },
  { readOnly: true, value: 'Email Address' },
  { readOnly: true, value: 'Telephone' },
  { readOnly: true, value: 'Office' },
  { readOnly: true, value: 'Status' },
]

export const tableDownloadHeaders: DataTableRow[] = [
  ...tableHeaders,
  { readOnly: true, value: 'Id (DO NOT EDIT)' },
  { readOnly: true, value: 'eTag (DO NOT EDIT)' },
]

const sampleHeaders = [
  'id (Left blank when create )',
  '_eTag (Left blank when create )',
  'Username',
  'Job Title',
  'Email Address',
  'Telephone',
  'Office',
  'Status',
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

type GetDataTable = {
  data: NegotiatorsQueryResponse
  updateNegotiator: (params) => void
  updateNegotiatorLoading: boolean
  createNegotiator: (params) => void
  officeData?: OfficesQueryResponse
  setData?: React.Dispatch<DataTableRow[][]>
  headers?: DataTableRow[]
}

export const getDataTable = ({
  data,
  updateNegotiator,
  updateNegotiatorLoading,
  createNegotiator,
  officeData,
  setData,
  headers = tableHeaders,
}: GetDataTable): DataTableRow[][] => {
  const negotiators: NegotiatorModel[] = data.GetNegotiators?._embedded || []

  const StatusCheckbox = props => {
    const { cellRenderProps, data } = props
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
        data={data}
        setData={setData}
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
  const dataTable = [headers, ...dataRows]
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
        return (
          (!fieldValidateRequire(cell.value as string) && minLengthValidator(5)(cell.value as string)) ||
          errorMessages.MINIMUM_CHARACTER_LENGTH(5)
        )
      }
      // cell email is required
      if (cellIndex === 2) {
        return (
          (!fieldValidateRequire(cell.value as string) && isEmail(cell.value as string)) ||
          errorMessages.FIELD_WRONG_EMAIL_FORMAT
        )
      }
      // cell telephone is required
      if (cellIndex === 3) {
        return (
          (!fieldValidateRequire(cell.value as string) && isNumberOnly(cell.value)) ||
          errorMessages.FIELD_WRONG_PHONE_FORMAT
        )
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
  updateNegotiator: (params) => void
  updateNegotiatorLoading: boolean
  createNegotiator: (params) => void
  officeData?: OfficesQueryResponse
}

export const createDownLoadButtonOnClickFn = ({
  totalCount = 0,
  client,
  setIsDownloading,
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

      const dataTable = getDataTable({
        data: { GetNegotiators: { _embedded: mergedEmbed || [] } },
        updateNegotiator,
        updateNegotiatorLoading,
        createNegotiator,
        officeData,
        headers: tableDownloadHeaders,
      })
      handleDownloadCsv(dataTable as Cell[][])()
    })
    .finally(() => {
      setIsDownloading(false)
    })
}

export const CustomDownButton = ({
  totalCount,
  officeData,
  updateNegotiatorLoading,
  updateNegotiator,
  createNegotiator,
}: {
  totalCount: number
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
  dataTable,
  pageNumber = 0,
  pageSize = 0,
  totalCount = 0,
  handleChangePage,
  updateNegotiator,
  createNegotiator,
  officeData,
  updateNegotiatorLoading,
}: RenderNegotiatorListParams) => {
  if (loading) {
    return <Loader />
  }
  return (
    <React.Fragment>
      <Section>
        <Spreadsheet
          CustomDownButton={
            <CustomDownButton
              updateNegotiatorLoading={updateNegotiatorLoading}
              updateNegotiator={updateNegotiator}
              createNegotiator={createNegotiator}
              officeData={officeData}
              totalCount={totalCount}
            />
          }
          allowOnlyOneValidationErrorPerRow={true}
          data={dataTable as Cell[][]}
          afterCellsChanged={handleAfterCellsChanged(updateNegotiator, createNegotiator)}
          validate={validate}
          hasDownloadSampleButton
          sampleHeaders={sampleHeaders}
        />
        <small className="has-text-link mb-1">
          * Please input the cell with background red first when Add New user
        </small>
      </Section>

      <Pagination pageNumber={pageNumber} pageSize={pageSize} totalCount={totalCount} onChange={handleChangePage} />
    </React.Fragment>
  )
}

export const prepareTableData = (
  setData,
  negotiatorData,
  updateNegotiator,
  updateNegotiatorLoading,
  createNegotiator,
  officeData,
) => () => {
  const dataTable = getDataTable({
    data: negotiatorData || { GetNegotiators: { _embedded: [] } },
    updateNegotiator,
    updateNegotiatorLoading,
    createNegotiator,
    officeData,
    setData,
  })
  setData(dataTable)
}

export const NegotiatorList: React.FC<NegotiatorListProps> = () => {
  const location = useLocation()
  const history = useHistory()
  const params = getParamsFromPath(location?.search)
  const page = Number(params?.page) || 1

  const [data, setData] = React.useState<DataTableRow[][]>([[]])
  const [updateNegotiator, { loading: updateNegotiatorLoading }] = useMutation(UPDATE_NEGOTIATOR)

  const { loading, data: negotiatorData } = useQuery<NegotiatorsQueryResponse, NegotiatorsQueryParams>(
    GET_NEGOTIATORS,
    {
      variables: { pageSize: NEGOTIATORS_PER_PAGE, pageNumber: page, embed: ['office'] },
    },
  ) as QueryResult<NegotiatorsQueryResponse, NegotiatorsQueryParams>

  const [createNegotiator] = useMutation(CREATE_NEGOTIATOR, {
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

  React.useEffect(
    prepareTableData(setData, negotiatorData, updateNegotiator, updateNegotiatorLoading, createNegotiator, officeData),
    [loading, page],
  )

  return (
    <div>
      {renderNegotiatorList({
        updateNegotiatorLoading,
        loading,
        dataTable: data,
        pageNumber: negotiatorData?.GetNegotiators?.pageNumber,
        pageSize: negotiatorData?.GetNegotiators?.pageSize,
        totalCount: negotiatorData?.GetNegotiators?.totalCount,
        handleChangePage: handleChangePage({ history }),
        updateNegotiator: updateNegotiator,
        createNegotiator: createNegotiator,
        officeData,
      })}
    </div>
  )
}

export default NegotiatorList
