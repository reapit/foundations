import * as React from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { ApolloClient } from 'apollo-boost'
import queryString from 'query-string'
import { ApolloQueryResult } from 'apollo-boost'
import { useQuery, useApolloClient, useMutation } from '@apollo/react-hooks'
import { QueryResult } from '@apollo/react-common'
import {
  Loader,
  Cell,
  AfterCellsChanged,
  Section,
  Pagination,
  Spreadsheet,
  AfterUploadDataValidated,
  UploadData,
  SetData,
  ChangedCells,
  isEmail,
  fieldValidateRequire,
  Button,
  handleDownloadCsv,
  minLengthValidator,
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
import { useUploadDispatch } from '@/hooks/use-upload'
import { startUpload, completeUpload, setUploadProgress } from '@/actions/update-provider'
import { Dispatch } from '@/reducers/update-provider'
import { UploadCsvMessage, UploadCsvResponseMessage } from '@/utils/worker-upload-helper'
import { MAX_ENTITIES_FETCHABLE_AT_ONE_TIME } from '@/constants/paginators'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'

import Worker from 'worker-loader!../../../worker/csv-upload.worker.ts'
import errorMessages from '@/constants/error-messages'

export const MINIMUM_OFFICE_NAME_LENGTH = 3

export const tableHeaders: Cell[] = [
  { readOnly: true, value: 'id', className: 'hidden-cell' },
  { readOnly: true, value: '_eTag', className: 'hidden-cell' },
  { readOnly: true, value: 'Office Name' },
  { readOnly: true, value: 'Building Name' },
  { readOnly: true, value: 'Building No.' },
  { readOnly: true, value: 'Address 1' },
  { readOnly: true, value: 'Address 2' },
  { readOnly: true, value: 'Address 3' },
  { readOnly: true, value: 'Address 4' },
  { readOnly: true, value: 'Post Code' },
  { readOnly: true, value: 'Telephone' },
  { readOnly: true, value: 'Office Email' },
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
  pageNumber?: number
  pageSize?: number
  totalCount?: number
  dataTable: Cell[][]
  handleChangePage: (page: number) => void
  afterCellsChanged: AfterCellsChanged
  handleAfterUpload: AfterUploadDataValidated
}

export interface CreateDownLoadButtonOnClickFnParams {
  totalCount: number
  client: ApolloClient<any>
  setIsDownloading: React.Dispatch<React.SetStateAction<boolean>>
}

export const createDownLoadButtonOnClickFn = ({
  totalCount = 0,
  client,
  setIsDownloading,
}: CreateDownLoadButtonOnClickFnParams) => () => {
  const fetchPages = Math.ceil(totalCount / MAX_ENTITIES_FETCHABLE_AT_ONE_TIME)

  setIsDownloading(true)
  /**
   * API currenlty only allow to fetch 100 items each time using pageSize
   * This func fetch Nth times based on totalCount parameter
   */
  const promises: Promise<ApolloQueryResult<OfficesQueryResponse>>[] = []
  for (let i = 1; i <= fetchPages; i++) {
    promises.push(
      client.query<OfficesQueryResponse, OfficesQueryParams>({
        query: GET_OFFICES,
        variables: {
          pageSize: MAX_ENTITIES_FETCHABLE_AT_ONE_TIME,
          pageNumber: i,
        },
      }),
    )
  }

  Promise.all(promises)
    .then(results => {
      const mergedResult = results.reduce<any[]>((mergedArr, result) => {
        const getOfficesEmbedded = (result.data?.GetOffices?._embedded || []) as any[]
        mergedArr.push(...getOfficesEmbedded)
        return mergedArr
      }, [])
      const dataTable = getDataTable({ GetOffices: { _embedded: mergedResult } }, true)
      handleDownloadCsv(dataTable, window, document)()
    })
    .finally(() => {
      setIsDownloading(false)
    })
}

export const CustomDownButton = ({ totalCount }: { totalCount: number }) => {
  const [isDownloading, setIsDownloading] = React.useState<boolean>(false)
  const client = useApolloClient()
  const downloadButtonOnClick = createDownLoadButtonOnClickFn({ totalCount, setIsDownloading, client })

  return (
    <div className="download-button">
      <Button loading={isDownloading} type="submit" variant="info" onClick={downloadButtonOnClick}>
        Download file
      </Button>
    </div>
  )
}

export const renderContent = ({
  loading,
  dataTable,
  pageNumber = 0,
  pageSize = 0,
  totalCount = 0,
  handleChangePage,
  afterCellsChanged,
  handleAfterUpload,
}: RenderContentParams) => {
  if (loading) {
    return <Loader />
  }
  return (
    <React.Fragment>
      <Section>
        <Spreadsheet
          allowOnlyOneValidationErrorPerRow={true}
          data={dataTable as Cell[][]}
          validate={validate}
          afterCellsChanged={afterCellsChanged}
          hasUploadButton
          hasDownloadButton
          afterUploadDataValidated={handleAfterUpload}
          CustomDownButton={<CustomDownButton totalCount={totalCount} />}
        />
      </Section>

      <Pagination pageNumber={pageNumber} pageSize={pageSize} totalCount={totalCount} onChange={handleChangePage} />
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

export const handleAfterCellChange = (createOffice, updateOffice, setData) => (
  changedCells: ChangedCells,
  data: Cell[][],
) => {
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
    createOffice({
      variables: createOfficeParams,
    }).then(response => {
      const {
        data: { CreateOffice },
      } = response

      rowData[0].value = CreateOffice.id
      rowData[1].value = CreateOffice._eTag
      setData(data)
    })
  }
}
/* istanbul ignore next */
export const handleAfterUpload = (dispatch: Dispatch, accessToken: string) => (params: {
  uploadData: UploadData
  currentData: Cell[][]
  setData: SetData
}) => {
  const { uploadData, setData } = params
  const [firstRow, ...rest] = uploadData.validatedData
  let data = uploadData.validatedData
  // if first row is header row, ignore it
  if (firstRow[0].value === 'id' && firstRow[1].value === '_eTag') {
    data = rest
  }
  const message: UploadCsvMessage = {
    from: 'FROM_MAIN',
    type: 'OFFICE',
    data,
    graphqlUri: window.reapit.config.graphqlUri,
    accessToken,
  }
  const uploadWorker = new Worker()
  uploadWorker.postMessage(message)
  uploadWorker.addEventListener('message', event => {
    handleWorkerMessage(event.data, dispatch, setData)
  })
}

/* istanbul ignore next */
export const handleWorkerMessage = (data: UploadCsvResponseMessage, dispatch: Dispatch, setData) => {
  const { status, total = 0, success = 0, failed = 0, details = [] } = data
  if (status === 'STARTED') {
    dispatch(startUpload(total))
  } else if (status === 'INPROGRESS') {
    dispatch(setUploadProgress(success + failed))
  } else if (data.status === 'FINISH') {
    dispatch(
      completeUpload({
        total,
        success,
        failed,
        details,
      }),
    )
    const successRowsData = details.filter(item => item.success).map(item => item.rowData)
    const uploadedDataTable = successRowsData.map(row => convertUploadedCellToTableCell(row))
    setData(prev => mergeUploadedData(prev, uploadedDataTable))
  }
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

export const prepareTableData = (setTableData: React.Dispatch<Cell[][]>, data?: OfficesQueryResponse) => () => {
  const dataTable = getDataTable(data || { GetOffices: { _embedded: [] } })
  setTableData(dataTable)
}

export const OfficesTab: React.FC<OfficesTabProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const location = useLocation()
  const history = useHistory()
  const params = queryString.parse(location?.search)
  const page = Number(params?.page) || 1
  const { loading, data } = useQuery<OfficesQueryResponse, OfficesQueryParams>(GET_OFFICES, {
    variables: { pageSize: OFFICES_PER_PAGE, pageNumber: page },
  }) as QueryResult<OfficesQueryResponse, OfficesQueryParams>
  const [createOffice] = useMutation<CreateOfficeResponse, CreateOfficeParams>(CREATE_OFFICE, {
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
  })
  const [updateOffice] = useMutation<UpdateOfficeResponse, UpdateOfficeParams>(UPDATE_OFFICE)
  const dispatch = useUploadDispatch()

  const [tableData, setTableData] = React.useState<Cell[][]>([[]])
  React.useEffect(prepareTableData(setTableData, data), [loading, page])

  return (
    <div>
      {renderContent({
        loading,
        dataTable: tableData,
        pageNumber: data?.GetOffices?.pageNumber,
        pageSize: data?.GetOffices?.pageSize,
        totalCount: data?.GetOffices?.totalCount,
        handleChangePage: handleChangePage({ history }),
        afterCellsChanged: handleAfterCellChange(createOffice, updateOffice, setTableData),
        handleAfterUpload: handleAfterUpload(dispatch, connectSession?.accessToken || ''),
      })}
    </div>
  )
}

export function getDataTable(data: OfficesQueryResponse, forDownload: boolean = false): Cell[][] {
  let dataTable: Cell[][] = [tableHeaders]
  const offices: OfficeModel[] = data.GetOffices?._embedded || []
  const dataRows = offices.map((office: OfficeModel) => [
    { value: office.id, key: 'id', readOnly: true, className: 'hidden-cell', title: 'id' },
    { value: office._eTag, key: '_eTag', readOnly: true, className: 'hidden-cell', title: 'etag' },
    { value: office.name, key: 'name', title: 'Office Name' },
    { value: office.address?.buildingName, key: 'address.buildingName', title: 'Building Name' },
    { value: office.address?.buildingNumber, key: 'address.buildingNumber', title: 'Building No.' },
    { value: office.address?.line1, key: 'address.line1', title: 'Address 1' },
    { value: office.address?.line2, key: 'address.line2', title: 'Address 2' },
    { value: office.address?.line3, key: 'address.line3', title: 'Address 3' },
    { value: office.address?.line4, key: 'address.line4', title: 'Address 4' },
    { value: office.address?.postcode, key: 'address.postcode', title: 'Post Code' },
    { value: office.workPhone, key: 'workPhone', title: 'Telephone' },
    { value: office.email, key: 'email', title: 'Email' },
  ]) as Cell[][]
  let dataHeader = tableHeaders
  if (forDownload) {
    dataHeader = [
      { readOnly: true, value: 'id (DO NOT EDIT)', className: 'hidden-cell' },
      { readOnly: true, value: '_eTag (DO NOT EDIT)', className: 'hidden-cell' },
      ...dataHeader.slice(2),
    ]
  }
  dataTable = [dataHeader, ...dataRows]
  return dataTable
}

export const validate = (data: Cell[][]) =>
  data.map((row, rowIndex) =>
    row.map((cell, cellIndex) => {
      if (rowIndex === 0) return true // dont need to validate header row
      // cell name is required and has length >= 3
      if (cellIndex === 2) {
        const name = cell.value as string
        return !fieldValidateRequire(name) && minLengthValidator(MINIMUM_OFFICE_NAME_LENGTH)(name)
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
        return (
          (!fieldValidateRequire(cell.value as string) && isNumber(cell.value as string)) ||
          errorMessages.FIELD_WRONG_PHONE_FORMAT
        )
      }
      // cell email is required
      if (cellIndex === 11) {
        return (
          (!fieldValidateRequire(cell.value as string) && isEmail(cell.value as string)) ||
          errorMessages.FIELD_WRONG_EMAIL_FORMAT
        )
      }
      return true
    }),
  )

export const convertUploadedCellToTableCell = (cell: Cell[]): Cell[] => {
  cell[0] = { ...cell[0], key: 'id', readOnly: true, className: 'hidden-cell' }
  cell[1] = { ...cell[1], key: '_eTag', readOnly: true, className: 'hidden-cell' }
  return cell
}

export const mergeUploadedData = (prev: Cell[][], uploadedData: Cell[][]): Cell[][] => {
  const prevIds = prev.map(rowData => rowData[0].value)
  const createdData: Cell[][] = []
  const updatedData = {} as Map<string, Cell[]>
  uploadedData.forEach(rowData => {
    if (prevIds.includes(rowData[0].value) && rowData[1].value) {
      updatedData[rowData[0]?.value || ''] = rowData
    } else {
      createdData.push(rowData)
    }
  })
  const newPrevData = prev.map(rowData => {
    const id = rowData[0].value || ''
    if (updatedData[id]) return updatedData[id]
    return rowData
  }) as Cell[][]

  return [...newPrevData, ...createdData]
}

export default OfficesTab
