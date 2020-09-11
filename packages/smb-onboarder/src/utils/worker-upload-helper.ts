import { ExecutionResult, GraphQLError } from 'graphql'
import { CreateOfficeModel } from '@reapit/foundations-ts-definitions'
import { Cell } from '@reapit/elements'
import { UploadResultDetail } from '@/reducers/update-provider'
import { UpdateOfficeParams } from '@/components/ui/offices-tab/offices-tab'
import { NegotiatorCreateParams, NegotiatorUpdateParams } from '@/components/ui/negotiators-list/negotiators-list'

export interface WorkerMessage {
  from: 'FROM_MAIN' | 'FROM_WORKER'
  type: 'OFFICE' | 'NEGOTIATOR'
}

export interface UploadCsvMessage extends WorkerMessage {
  graphqlUri?: string
  accessToken?: string
  data: Cell[][]
}

export interface UploadCsvResponseMessage {
  status: 'STARTED' | 'INPROGRESS' | 'FINISH'
  total?: number
  success?: number
  failed?: number
  details?: Array<UploadResultDetail>
}

export interface MutationParams<T> {
  graphqlUri?: string
  accessToken?: string
  operationName?: string
  query: string
  variables: T
}

export interface MutationResult<T> {
  success: boolean
  data?: MutationParams<T>
  errors?: Array<{ message: string }>
  response?: ExecutionResult
}

const NEGOTIATOR_INDEXES = {
  name: 0,
  jobTitle: 1,
  email: 2,
  mobilePhone: 3,
  officeId: 4,
  active: 5,
  id: 6,
  _eTag: 7,
}

const OFFICE_INDEXES = {
  id: 0,
  _eTag: 1,
  name: 2,
  buildingName: 3,
  buildingNumber: 4,
  line1: 5,
  line2: 6,
  line3: 7,
  line4: 8,
  postcode: 9,
  workPhone: 10,
  email: 11,
}

/*
 * serial executes Promises sequentially.
 * @param {funcs} An array of funcs that return promises.
 * @example
 * const urls = ['/url1', '/url2', '/url3']
 * serial(urls.map(url => () => $.ajax(url)))
 *     .then(console.log.bind(console))
 */
export const serial = (funcs: Array<() => Promise<any>>) =>
  funcs.reduce(
    (promise: Promise<any>, func: () => Promise<any>) =>
      promise.then(result => func().then(Array.prototype.concat.bind(result))),
    Promise.resolve([]),
  )

export const mutation = <T>({
  graphqlUri = '',
  accessToken = '',
  operationName,
  query,
  variables,
}: MutationParams<T>): Promise<MutationResult<T>> => {
  return new Promise<MutationResult<T>>(resolve => {
    fetch(graphqlUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: accessToken,
      },
      body: JSON.stringify({
        query,
        variables,
        operationName,
      }),
    })
      .then(response => response.json())
      .then((response: ExecutionResult) => {
        if (response.errors) {
          resolve({
            success: false,
            data: { operationName, query, variables },
            errors: response.errors.map((error: GraphQLError) => ({ message: error.message })),
          })
        }
        resolve({
          success: true,
          data: { operationName, query, variables },
          response,
        })
      })
      .catch(error =>
        resolve({
          success: false,
          data: { operationName, query, variables },
          errors: [{ message: error?.message }],
        }),
      )
  })
}

export const prepareCreateOfficeParams = (rowData: Cell[]): CreateOfficeModel => {
  return {
    name: rowData[OFFICE_INDEXES.name].value as string,
    address: {
      buildingName: rowData[OFFICE_INDEXES.buildingName].value as string,
      buildingNumber: rowData[OFFICE_INDEXES.buildingNumber].value as string,
      line1: rowData[OFFICE_INDEXES.line1].value as string,
      line2: rowData[OFFICE_INDEXES.line2].value as string,
      line3: rowData[OFFICE_INDEXES.line3].value as string,
      line4: rowData[OFFICE_INDEXES.line4].value as string,
      postcode: rowData[OFFICE_INDEXES.postcode].value as string,
    },
    workPhone: rowData[OFFICE_INDEXES.workPhone].value as string,
    email: rowData[OFFICE_INDEXES.email].value as string,
  }
}

export const prepareUpdateOfficeParams = (rowData: Cell[]): UpdateOfficeParams => {
  return {
    id: rowData[OFFICE_INDEXES.id].value as string,
    _eTag: rowData[OFFICE_INDEXES._eTag].value as string,
    name: rowData[OFFICE_INDEXES.name].value as string,
    address: {
      buildingName: rowData[OFFICE_INDEXES.buildingName].value as string,
      buildingNumber: rowData[OFFICE_INDEXES.buildingNumber].value as string,
      line1: rowData[OFFICE_INDEXES.line1].value as string,
      line2: rowData[OFFICE_INDEXES.line2].value as string,
      line3: rowData[OFFICE_INDEXES.line3].value as string,
      line4: rowData[OFFICE_INDEXES.line4].value as string,
      postcode: rowData[OFFICE_INDEXES.postcode].value as string,
    },
    workPhone: rowData[OFFICE_INDEXES.workPhone].value as string,
    email: rowData[OFFICE_INDEXES.email].value as string,
  }
}

export const prepareUpdateNegotiatorParams = (rowData: Cell[]): NegotiatorUpdateParams => {
  const active = Boolean(rowData[NEGOTIATOR_INDEXES.active].value?.toLowerCase() === 'true')
  return {
    name: rowData[NEGOTIATOR_INDEXES.name].value as string,
    jobTitle: rowData[NEGOTIATOR_INDEXES.jobTitle].value as string,
    email: rowData[NEGOTIATOR_INDEXES.email].value as string,
    mobilePhone: rowData[NEGOTIATOR_INDEXES.mobilePhone].value as string,
    active: active,
    id: rowData[NEGOTIATOR_INDEXES.id]?.value as string,
    _eTag: rowData[NEGOTIATOR_INDEXES._eTag]?.value as string,
  }
}

export const prepareCreateNegotiatorParams = (rowData: Cell[]): NegotiatorCreateParams => {
  const active = Boolean(rowData[NEGOTIATOR_INDEXES.active].value?.toLowerCase() === 'true')
  return {
    name: rowData[NEGOTIATOR_INDEXES.name].value as string,
    jobTitle: rowData[NEGOTIATOR_INDEXES.jobTitle].value as string,
    email: rowData[NEGOTIATOR_INDEXES.email].value as string,
    mobilePhone: rowData[NEGOTIATOR_INDEXES.mobilePhone].value as string,
    officeId: rowData[NEGOTIATOR_INDEXES.officeId].value as string,
    active: active,
  }
}
