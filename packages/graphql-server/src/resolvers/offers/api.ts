import qs from 'query-string'
import logger from '../../logger'
import { ServerContext } from '../../index'
import {
  CreateOfferArgs,
  UpdateOfferArgs,
  GetOfferByIdArgs,
  GetOffersArgs,
  GetOfferByIdReturn,
  GetOffersReturn,
  CreateOfferReturn,
  UpdateOfferReturn,
} from './offers'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetOfferByIdAPI = async (args: GetOfferByIdArgs, context: ServerContext): GetOfferByIdReturn => {
  const traceId = context.traceId
  logger.info('callGetOfferByIdAPI', { traceId, args })
  try {
    const { id, ...rest } = args
    const params = qs.stringify(rest as Record<string, string>)
    const response = await createPlatformAxiosInstance().get<GetOfferByIdReturn>(`${URLS.offers}/${id}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetOfferByIdAPI' })
    return handleErrorResult
  }
}

export const callGetOffersAPI = async (args: GetOffersArgs, context: ServerContext): GetOffersReturn => {
  const traceId = context.traceId
  logger.info('callGetOffersAPI', { args, traceId })
  try {
    const params = qs.stringify(args)
    const response = await createPlatformAxiosInstance().get<GetOffersReturn>(`${URLS.offers}?${params}`, {
      headers: {
        Authorization: context.authorization,
      },
    })
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetOffersAPI' })
    return handleErrorResult
  }
}

export const callCreateOfferAPI = async (args: CreateOfferArgs, context: ServerContext): CreateOfferReturn => {
  const traceId = context.traceId
  logger.info('callCreateOfferAPI', { traceId, args })
  try {
    const response = await createPlatformAxiosInstance().post<CreateOfferReturn>(URLS.offers, args, {
      headers: {
        Authorization: context.authorization,
      },
    })
    const id = getIdFromCreateHeaders({ headers: response.headers })
    if (id) {
      return callGetOfferByIdAPI({ id }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateOfferAPI' })
    return handleErrorResult
  }
}

export const callUpdateOfferAPI = async (args: UpdateOfferArgs, context: ServerContext): UpdateOfferReturn => {
  const traceId = context.traceId
  logger.info('callUpdateOfferAPI', { traceId, args })
  try {
    const { _eTag, ...payload } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateOfferReturn>(
      `${URLS.offers}/${args.id}`,
      payload,
      {
        headers: {
          Authorization: context.authorization,
          'If-Match': _eTag,
        },
      },
    )
    if (updateResponse) {
      return callGetOfferByIdAPI({ id: args.id }, context)
    }
    return errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateOfferAPI' })
    return handleErrorResult
  }
}
