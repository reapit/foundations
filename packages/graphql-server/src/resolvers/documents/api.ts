import qs from 'query-string'
import {
  CreateDocumentArgs,
  GetDocumentsArgs,
  GetDocumentsReturn,
  CreateDocumentReturn,
  GetDocumentByIdArgs,
  GetDocumentByIdReturn,
  UpdateDocumentArgs,
  UpdateDocumentReturn,
  DeleteDocumentArgs,
  DeleteDocumentReturn,
  GetDocumentDownloadArgs,
  GetDocumentDownloadReturn,
} from './documents'
import errors from '../../errors'

import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { ServerContext } from '../../index'
import logger from '../../logger'
import { URLS } from '../../constants/api'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'
import { FileResult } from '@/types'

export const callGetDocumentByIdAPI = async (
  args: GetDocumentByIdArgs,
  context: ServerContext,
): GetDocumentByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetDocumentByIdAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetDocumentByIdReturn>(`${URLS.documents}/${args.id}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetDocumentByIdAPI' })
    return handleErrorResult
  }
}

export const callGetDocumentsAPI = async (args: GetDocumentsArgs, context: ServerContext): GetDocumentsReturn => {
  const traceId = context.traceId
  logger.info('callGetDocumentsAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetDocumentsReturn>(`${URLS.documents}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetDocumentsAPI' })
    return handleErrorResult
  }
}

export const callCreateDocumentAPI = async (args: CreateDocumentArgs, context: ServerContext): CreateDocumentReturn => {
  const traceId = context.traceId
  logger.info('callCreateDocumentAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateDocumentReturn>(URLS.documents, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetDocumentByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateDocumentAPI' })
    return handleErrorResult
  }
}

export const callUpdateDocumentAPI = async (args: UpdateDocumentArgs, context: ServerContext): UpdateDocumentReturn => {
  const traceId = context.traceId
  logger.info('callUpdateDocumentAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateDocumentReturn>(
      `${URLS.appointments}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetDocumentByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateDocumentAPI' })
    return handleErrorResult
  }
}

export const callDeleteDocumentAPI = async (args: DeleteDocumentArgs, context: ServerContext): DeleteDocumentReturn => {
  const traceId = context.traceId
  logger.info('callDeleteDocumentAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().delete<DeleteDocumentReturn>(`${URLS.documents}/${args.id}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    if (response.status === 204) {
      return args.id
    }
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callDeleteDocumentAPI' })
    return handleErrorResult
  }
}

export const callGetDocumentDownloadAPI = async (
  args: GetDocumentDownloadArgs,
  context: ServerContext,
): GetDocumentDownloadReturn => {
  const traceId = context.traceId
  logger.info('callGetDocumentDownloadAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().get<GetDocumentDownloadArgs>(
      `${URLS.documents}/${args.id}/download`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data as FileResult
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetDocumentDownloadAPI' })
    return handleErrorResult
  }
}
