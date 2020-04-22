import { CreateOfficeModel } from '@reapit/foundations-ts-definitions'
import { print } from 'graphql/language/printer'
import CREATE_OFFICE from '@/components/ui/offices-tab/gql/create-office.graphql'
import {
  serial,
  mutation,
  UploadCsvMessage,
  UploadCsvResponseMessage,
  prepareCreateOfficeParams,
} from '@/utils/worker-upload-helper'
import { Cell } from '@reapit/elements'

const ctx: Worker = self as any

ctx.addEventListener('message', event => {
  const { type, data, accessToken, graphqlUri } = event.data as UploadCsvMessage
  if (type === 'OFFICE') {
    const message: UploadCsvResponseMessage = {
      status: 'STARTED',
      total: data.length,
    }
    // emit started message
    ctx.postMessage(message)
    let successItem = 0
    let failedItem = 0
    const tasks = data.map((rowData: Cell[]) => {
      const model = prepareCreateOfficeParams(rowData)
      return () =>
        new Promise(resolve => {
          mutation<CreateOfficeModel>({
            graphqlUri,
            accessToken,
            operationName: 'CREATE_OFFICE',
            query: print(CREATE_OFFICE),
            variables: model,
          }).then(result => {
            if (result.success) {
              successItem++
            } else {
              failedItem++
            }
            // emit in-progress message
            ctx.postMessage({
              status: 'INPROGRESS',
              success: successItem,
              failed: failedItem,
            } as UploadCsvResponseMessage)
            resolve({
              ...result,
              rowData,
            })
          })
        })
    })

    serial(tasks).then(results => {
      ctx.postMessage({
        status: 'FINISH',
        total: data.length,
        success: successItem,
        failed: failedItem,
        details: results,
      } as UploadCsvResponseMessage)
    })
  }
})
