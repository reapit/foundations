import { CreateOfficeModel, UpdateNegotiatorModel, CreateNegotiatorModel } from '@reapit/foundations-ts-definitions'
import { print } from 'graphql/language/printer'
import CREATE_OFFICE from '@/components/ui/offices-tab/gql/create-office.graphql'
import UPDATE_OFFICE from '@/components/ui/offices-tab/gql/update-office.graphql'
import CREATE_NEGOTIATOR from '@/components/ui/negotiators-list/gql/create-negotiator.graphql'
import UPDATE_NEGOTIATOR from '@/components/ui/negotiators-list/gql/update-negotiator.graphql'
import {
  serial,
  mutation,
  UploadCsvMessage,
  UploadCsvResponseMessage,
  prepareCreateOfficeParams,
  prepareUpdateOfficeParams,
  prepareUpdateNegotiatorParams,
  prepareCreateNegotiatorParams,
} from '@/utils/worker-upload-helper'
import { Cell } from '@reapit/elements'
import { UpdateOfficeParams } from '@/components/ui/offices-tab/offices-tab'

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
      let promise
      if (rowData[0].value && rowData[1].value) {
        // row has id and eTag, process update
        const model = prepareUpdateOfficeParams(rowData)
        promise = mutation<UpdateOfficeParams>({
          graphqlUri,
          accessToken: `Bearer ${accessToken}`,
          operationName: 'UPDATE_OFFICE',
          query: print(UPDATE_OFFICE),
          variables: model,
        })
      } else {
        // process create new office
        const model = prepareCreateOfficeParams(rowData)
        promise = mutation<CreateOfficeModel>({
          graphqlUri,
          accessToken: `Bearer ${accessToken}`,
          operationName: 'CREATE_OFFICE',
          query: print(CREATE_OFFICE),
          variables: model,
        })
      }

      return () =>
        new Promise(resolve => {
          promise.then(result => {
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

  if (type == 'NEGOTIATOR') {
    const message: UploadCsvResponseMessage = {
      status: 'STARTED',
      total: data.length,
    }
    ctx.postMessage(message)
    let successItem = 0
    let failedItem = 0
    const tasks = data.map((rowData: Cell[]) => {
      let promise
      if (rowData[6]?.value && rowData[7]?.value) {
        // row has id and eTag, process update
        const model = prepareUpdateNegotiatorParams(rowData)
        promise = mutation<UpdateNegotiatorModel>({
          graphqlUri,
          accessToken: `Bearer ${accessToken}`,
          // operationName: 'UPDATE_NEGOTIATOR',
          query: print(UPDATE_NEGOTIATOR),
          variables: model,
        })
      } else {
        // process create new office
        const model = prepareCreateNegotiatorParams(rowData)
        promise = mutation<CreateNegotiatorModel>({
          graphqlUri,
          accessToken: `Bearer ${accessToken}`,
          // operationName: 'CREATE_NEGOTIATOR',
          query: print(CREATE_NEGOTIATOR),
          variables: model,
        })
      }

      return () =>
        new Promise(resolve => {
          promise.then(result => {
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
