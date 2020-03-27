import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import queryString from 'query-string'
import { ApolloError } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import {
  Loader,
  Cell,
  AfterCellsChanged,
  Alert,
  Section,
  Pagination,
  Spreadsheet,
  ChangedCells,
  isEmail,
  fieldValidateRequire,
  Toast,
  ErrorData,
} from '@reapit/elements'
import {
  PagedResultOfficeModel_,
  OfficeModel,
  CreateOfficeModel,
  UpdateOfficeModel,
} from '@reapit/foundations-ts-definitions'
import GET_OFFICES from './gql/get-offices.graphql'
import CREATE_OFFICE from './gql/create-office.graphql'
import UPDATE_OFFICE from './gql/update-office.graphql'
import { OFFICES_PER_PAGE } from '@/constants/paginators'
import { isNumber } from '@/utils/validators'

import Worker from 'worker-loader!../../../core/upload.worker'

export const tableHeaders: Cell[] = [
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

export type CreateOfficeParams = CreateOfficeModel

export type CreateOfficeResponse = {
  CreateOffice: OfficeModel
}

export type UpdateOfficeParams = { id: string; _eTag: string } & UpdateOfficeModel

export type UpdateOfficeResponse = {
  UpdateOffice: OfficeModel
}

export type RenderContentParams = {
  loading: boolean
  error?: ApolloError
  pageNumber?: number
  pageSize?: number
  totalCount?: number
  dataTable: Cell[][]
  handleChangePage: (page: number) => void
  afterCellsChanged: AfterCellsChanged
  handleSubmitFileData: (fileData: any) => void
}

export const renderContent = ({
  loading,
  error,
  dataTable,
  pageNumber = 0,
  pageSize = 0,
  totalCount = 0,
  handleChangePage,
  afterCellsChanged,
  handleSubmitFileData,
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
        validate={validate}
        afterCellsChanged={afterCellsChanged}
        onSubmitFileData={handleSubmitFileData}
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

export const handleAfterCellChange = (createOffice, updateOffice) => (changedCells: ChangedCells, data: Cell[][]) => {
  console.log('changedCells', changedCells)
  const [changes] = changedCells
  const {
    newCell: { isValidated },
    row,
  } = changes
  if (!isValidated) return
  const rowData = data[row]
  const id = rowData[0].value as string
  const eTag = rowData[1].value as string
  const isEditMode = id && eTag
  if (isEditMode) {
    const updateOfficeParams = prepareUpdateOfficeParams(changedCells, data)
    updateOffice({
      variables: updateOfficeParams,
    })
  } else {
    const isValidRow = rowData.every(row => row.isValidated)
    if (!isValidRow) {
      return
    }
    const createOfficeParams = prepareCreateOfficeParams(changedCells, data)
    console.log('changedCells', changedCells)
    console.log('data', data)
    console.log('createOfficeParams', createOfficeParams)
    createOffice({
      variables: createOfficeParams,
    })
  }
}

export const handleSubmitFileData = (fileData: any) => {
  const params = {
    type: 'office',
    data: fileData,
  }

  const uploadWorker = new Worker()
  uploadWorker.postMessage(params)

  uploadWorker.addEventListener('message', e => {
    const { totalRecord } = e.data
    console.log('totalRecord', totalRecord)
  })
}

export const prepareUpdateOfficeParams = (changedCells: ChangedCells, data: Cell[][]): UpdateOfficeParams => {
  const [changes] = changedCells
  const {
    newCell: { key, value },
    row,
  } = changes
  const rowData = data[row]
  const id = rowData[0].value as string
  const eTag = rowData[1].value as string
  const updateObj: UpdateOfficeModel = {}
  if (key?.startsWith('address')) {
    const addressNestedKey = key.split('.')[1]
    updateObj.address = { [addressNestedKey]: value }
  } else {
    updateObj[key || ''] = value
  }

  return {
    id,
    _eTag: eTag,
    ...updateObj,
  }
}

export const prepareCreateOfficeParams = (changedCells: ChangedCells, data: Cell[][]): CreateOfficeParams => {
  const [changes] = changedCells
  const { row } = changes
  const rowData = data[row]
  const name = rowData[2].value as string
  const buildingName = rowData[3].value as string
  const buildingNumber = rowData[4].value as string
  const line1 = rowData[5].value as string
  const line2 = rowData[6].value as string
  const line3 = rowData[7].value as string
  const line4 = rowData[8].value as string
  const postcode = rowData[9].value as string
  const workPhone = rowData[10].value as string
  const email = rowData[11].value as string

  return {
    name,
    address: {
      buildingName,
      buildingNumber,
      line1,
      line2,
      line3,
      line4,
      postcode,
    },
    workPhone,
    email,
  }
}

export const handleErrorMessageUseEffect = (createOfficeError, updateOfficeError, setErrorServer) => {
  return () => {
    if (createOfficeError) {
      setErrorServer({
        type: 'SERVER',
        message: createOfficeError.message,
      })
    }
    if (updateOfficeError) {
      setErrorServer({
        type: 'SERVER',
        message: updateOfficeError.message,
      })
    }
  }
}

export const OfficesTab: React.FC<OfficesTabProps> = () => {
  const location = useLocation()
  const history = useHistory()
  const params = queryString.parse(location?.search)
  const page = Number(params?.page) || 1
  const [serverError, setErrorServer] = React.useState<ErrorData | null>(null)
  const [componentError, setErrorComponent] = React.useState<ErrorData | null>(null)
  const { loading, error, data } = useQuery<OfficesQueryResponse, OfficesQueryParams>(GET_OFFICES, {
    variables: { pageSize: OFFICES_PER_PAGE, pageNumber: page },
  }) as QueryResult<OfficesQueryResponse, OfficesQueryParams>
  const [createOffice, { error: createOfficeError }] = useMutation<CreateOfficeResponse, CreateOfficeParams>(
    CREATE_OFFICE,
    {
      update: (proxy, fetchResult) => {
        const cacheData = proxy.readQuery<OfficesQueryResponse, OfficesQueryParams>({
          query: GET_OFFICES,
          variables: { pageSize: OFFICES_PER_PAGE, pageNumber: page },
        })
        proxy.writeQuery({
          query: GET_OFFICES,
          variables: { pageSize: OFFICES_PER_PAGE, pageNumber: page },
          data: {
            GetOffices: {
              ...cacheData?.GetOffices,
              _embedded: [...(cacheData?.GetOffices?._embedded || []), fetchResult.data?.CreateOffice],
            },
          },
        })
      },
    },
  )
  const [updateOffice, { error: updateOfficeError }] = useMutation<UpdateOfficeResponse, UpdateOfficeParams>(
    UPDATE_OFFICE,
  )

  const dataTable = React.useMemo(() => getDataTable(data || { GetOffices: { _embedded: [] } }), [data])

  React.useEffect(handleErrorMessageUseEffect(createOfficeError, updateOfficeError, setErrorServer), [
    createOfficeError,
    updateOfficeError,
  ])

  const errorClearedComponent = () => {
    setErrorComponent(null)
  }

  const errorClearedServer = () => {
    setErrorServer(null)
  }

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
        afterCellsChanged: handleAfterCellChange(createOffice, updateOffice),
        handleSubmitFileData,
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

export function getDataTable(data: OfficesQueryResponse): Cell[][] {
  let dataTable: Cell[][] = [tableHeaders]
  const offices: OfficeModel[] = data.GetOffices?._embedded || []
  const dataRows = offices.map((office: OfficeModel) => [
    { value: office.id, key: 'id', readOnly: true, className: 'hidden-cell' },
    { value: office._eTag, key: '_eTag', readOnly: true, className: 'hidden-cell' },
    { value: office.name, key: 'name' },
    { value: office.address?.buildingName, key: 'address.buildingName' },
    { value: office.address?.buildingNumber, key: 'address.buildingNumber' },
    { value: office.address?.line1, key: 'address.line1' },
    { value: office.address?.line2, key: 'address.line2' },
    { value: office.address?.line3, key: 'address.line3' },
    { value: office.address?.line4, key: 'address.line4' },
    { value: office.address?.postcode, key: 'address.postcode' },
    { value: office.workPhone, key: 'workPhone' },
    { value: office.email, key: 'email' },
  ]) as Cell[][]
  dataTable = [tableHeaders, ...dataRows]
  return dataTable
}

export const validate = (data: Cell[][]) =>
  data.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      if (rowIndex === 0) return true // dont need to validate header row
      // cell name is required
      if (cellIndex === 2) {
        return !fieldValidateRequire(cell.value as string)
      }
      // cell addess1 is required
      if (cellIndex === 5) {
        return !fieldValidateRequire(cell.value as string)
      }
      // cell postalcode is required
      if (cellIndex === 9) {
        return !fieldValidateRequire(cell.value as string)
      }
      // cell telephone is required
      if (cellIndex === 10) {
        return !fieldValidateRequire(cell.value as string) && isNumber(cell.value as string)
      }
      // cell email is required
      if (cellIndex === 11) {
        return !fieldValidateRequire(cell.value as string) && isEmail(cell.value as string)
      }
      return true
    }),
  )

export default OfficesTab
