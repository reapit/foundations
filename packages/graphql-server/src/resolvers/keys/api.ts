import logger from '../../logger'
import { ServerContext } from '../../utils'
import {
  CreateKeyArgs,
  CreateKeyReturn,
  GetKeyArgs,
  GetKeyReturn,
  GetPropertyKeysArgs,
  GetPropertyKeysReturn,
  GetKeyMovementsArgs,
  GetKeyMovementReturn,
  GetKeyMovementsReturn,
  GetKeyMovementArgs,
  UpdateKeyMovementArgs,
  UpdateKeyMovementReturn,
  CreateKeyMovementArgs,
  CreateKeyMovementReturn,
} from './keys'
import errors from '../../errors'
import { URLS } from '../../constants/api'
import { createPlatformAxiosInstance } from '../../utils/axios-instances'
import { handleError } from '../../utils/handle-error'
import { getIdFromCreateHeaders } from '../../utils/get-id-from-create-headers'

export const callGetPropertyKeysAPI = async (
  args: GetPropertyKeysArgs,
  context: ServerContext,
): GetPropertyKeysReturn => {
  const traceId = context.traceId
  logger.info('callGetPropertyKeysAPI', { traceId, args })
  try {
    const { propertyId } = args
    const response = await createPlatformAxiosInstance().get<GetPropertyKeysReturn>(
      `${URLS.properties}/${propertyId}/keys`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetPropertyKeysAPI' })
    throw handleErrorResult
  }
}

export const callGetKeyAPI = async (args: GetKeyArgs, context: ServerContext): GetKeyReturn => {
  const traceId = context.traceId
  logger.info('callGetKeyAPI', { args, traceId })
  try {
    const { propertyId, keyId } = args
    const response = await createPlatformAxiosInstance().get<GetKeyReturn>(
      `${URLS.properties}/${propertyId}/keys/${keyId}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetKeyAPI' })
    throw handleErrorResult
  }
}

export const callCreateKeyAPI = async (args: CreateKeyArgs, context: ServerContext): CreateKeyReturn => {
  const traceId = context.traceId
  logger.info('callCreateKeyAPI', { traceId, args })
  const { propertyId, ...rest } = args
  try {
    const response = await createPlatformAxiosInstance().post<CreateKeyReturn>(
      `${URLS.properties}/${propertyId}/keys`,
      rest,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    const keyId = getIdFromCreateHeaders({ headers: response.headers })
    if (keyId) {
      return callGetKeyAPI({ keyId, propertyId }, context)
    }
    return null
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateKeyAPI' })
    throw handleErrorResult
  }
}

export const callGetKeyMovementsAPI = async (
  args: GetKeyMovementsArgs,
  context: ServerContext,
): GetKeyMovementsReturn => {
  const traceId = context.traceId
  logger.info('callGetKeyMovementsAPI', { args, traceId })
  try {
    const { propertyId, keyId } = args
    const response = await createPlatformAxiosInstance().get<GetKeyMovementsReturn>(
      `${URLS.properties}/${propertyId}/keys/${keyId}/movements`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetKeyMovementsAPI' })
    throw handleErrorResult
  }
}

export const callGetKeyMovementAPI = async (args: GetKeyMovementArgs, context: ServerContext): GetKeyMovementReturn => {
  const traceId = context.traceId
  logger.info('callGetKeyMovementsAPI', { args, traceId })
  try {
    const { propertyId, keyId, movementId } = args
    const response = await createPlatformAxiosInstance().get<GetKeyMovementReturn>(
      `${URLS.properties}/${propertyId}/keys/${keyId}/movements/${movementId}`,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    return response?.data
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callGetKeyMovementsAPI' })
    throw handleErrorResult
  }
}

export const callCreateKeyMovementAPI = async (
  args: CreateKeyMovementArgs,
  context: ServerContext,
): CreateKeyMovementReturn => {
  const traceId = context.traceId
  logger.info('callCreateKeyMovementAPI', { args, traceId })
  try {
    const { propertyId, keyId, movement } = args
    const response = await createPlatformAxiosInstance().post<GetKeyMovementReturn>(
      `${URLS.properties}/${propertyId}/keys/${keyId}/movements`,
      movement,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    const movementId = getIdFromCreateHeaders({ headers: response.headers })
    if (movementId) {
      return callGetKeyMovementAPI({ keyId, propertyId, movementId }, context)
    }
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callCreateKeyMovementAPI' })
    throw handleErrorResult
  }
}

export const callUpdateKeyMovementAPI = async (
  args: UpdateKeyMovementArgs,
  context: ServerContext,
): UpdateKeyMovementReturn => {
  const traceId = context.traceId
  logger.info('callUpdateKeyMovementAPI', { traceId, args })
  try {
    const { propertyId, keyId, movementId, ...rest } = args
    const updateResponse = await createPlatformAxiosInstance().patch<UpdateKeyMovementReturn>(
      `${URLS.properties}/${propertyId}/${keyId}/movements/${movementId}`,
      rest,
      {
        headers: {
          Authorization: context.authorization,
        },
      },
    )
    if (updateResponse.status === 201) {
      return callGetKeyMovementAPI(args, context)
    }
    throw errors.generateUserInputError(traceId)
  } catch (error) {
    const handleErrorResult = await handleError({ error, traceId, caller: 'callUpdateKeyMovementAPI' })
    throw handleErrorResult
  }
}
