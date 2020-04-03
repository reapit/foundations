import { ExecutionResult, GraphQLError } from 'graphql'
import { CreateOfficeModel } from '@reapit/foundations-ts-definitions'
import { Cell } from '@reapit/elements'
import { UploadResultDetail } from '@/components/providers/upload-provider/reducers'

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
  operationName: string
  query: string
  variables: T
}

export interface MutationResult<T> {
  success: boolean
  data?: MutationParams<T>
  errors?: Array<{ message: string }>
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
    name: rowData[2].value as string, // name column
    address: {
      buildingName: rowData[3].value as string, // buildingName column
      buildingNumber: rowData[4].value as string, // buildingNumber column
      line1: rowData[5].value as string, // line1 column
      line2: rowData[6].value as string, // line2 column
      line3: rowData[7].value as string, // line3 column
      line4: rowData[8].value as string, // line4 column
      postcode: rowData[9].value as string, // postcode column
    },
    workPhone: rowData[10].value as string, // workPhone column
    email: rowData[11].value as string, // email column
  }
}
