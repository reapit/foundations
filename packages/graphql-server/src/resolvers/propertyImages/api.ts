import qs from 'query-string'
import { ServerContext } from '../../utils'
import {
  GetPropertyImageByIdArgs,
  CreatePropertyImageArgs,
  UpdatePropertyImageArgs,
  GetPropertyImagesArgs,
  GetPropertyImageByIdReturn,
  GetPropertyImagesReturn,
  CreatePropertyImageReturn,
  UpdatePropertyImageReturn,
  DeletePropertyImageArgs,
  DeletePropertyImageReturn,
} from './propertyImages'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetPropertyImageByIdAPI = async (
  args: GetPropertyImageByIdArgs,
  context: ServerContext,
): GetPropertyImageByIdReturn => {
  const traceId = context.traceId
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetPropertyImageByIdReturn>(
      `${URLS.propertyImages}/${id}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetPropertyImageByIdAPI' })
    return handleErrorResult
  }
}

export const callGetPropertyImagesAPI = async (
  args: GetPropertyImagesArgs,
  context: ServerContext,
): GetPropertyImagesReturn => {
  const traceId = context.traceId
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetPropertyImagesReturn>(
      `${URLS.propertyImages}?${params}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetPropertyImagesAPI' })
    return handleErrorResult
  }
}

export const callCreatePropertyImageAPI = async (
  args: CreatePropertyImageArgs,
  context: ServerContext,
): CreatePropertyImageReturn => {
  const traceId = context.traceId
  try {
    console.log(context.authorization)
    const response = await createPlatformAxiosInstance().post<CreatePropertyImageReturn>(URLS.propertyImages, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetPropertyImageByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreatePropertyImageAPI' })
    return handleErrorResult
  }
}

export const callUpdatePropertyImageAPI = async (
  args: UpdatePropertyImageArgs,
  context: ServerContext,
): UpdatePropertyImageReturn => {
  const traceId = context.traceId
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdatePropertyImageReturn>(
      `${URLS.propertyImages}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse.status === 204) {
      return callGetPropertyImageByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdatePropertyImageAPI' })
    return handleErrorResult
  }
}

export const callDeletePropertyImageAPI = async (
  args: DeletePropertyImageArgs,
  context: ServerContext,
): DeletePropertyImageReturn => {
  const traceId = context.traceId
  try {
    const deleteResponse = await createPlatformAxiosInstance().delete<DeletePropertyImageReturn>(
      `${URLS.propertyImages}/${args.id}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    if (deleteResponse.status === 204) {
      return true
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callDeletePropertyImageAPI' })
    return handleErrorResult
  }
}
