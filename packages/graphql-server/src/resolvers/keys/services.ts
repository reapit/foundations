import logger from '../../logger'
import { ServerContext } from '../../utils'
import {
  APIResultKey,
  APIResultKeyMovement,
  CreateKeyArgs,
  CreateKeyMovementArgs,
  CreateKeyReturn,
  GetKeyArgs,
  GetKeyMovementArgs,
  GetKeyMovementsArgs,
  GetKeyReturn,
  GetPropertyKeysArgs,
  KeyStatus,
  MutationCreateKeyMovementReturn,
  MutationUpdateKeyMovementReturn,
  PropertyKey,
  PropertyKeyMovement,
  QueryGetPropertyKeyMovementReturn,
  QueryGetPropertyKeyMovementsReturn,
  QueryGetPropertyKeysReturn,
  UpdateKeyMovementArgs,
} from './keys'
import {
  callCreateKeyAPI,
  callCreateKeyMovementAPI,
  callGetKeyAPI,
  callGetKeyMovementAPI,
  callGetKeyMovementsAPI,
  callGetPropertyKeysAPI,
  callUpdateKeyMovementAPI,
} from './api'
import { callGetConfigurationsByTypeApi } from '../configurations/api'

const convertPlatformKeysToKeys = async (keys: APIResultKey[], context: ServerContext): Promise<PropertyKey[]> => {
  const types = await callGetConfigurationsByTypeApi({ type: 'keyTypes' }, context)

  return Promise.all(
    keys.map(async (key) => ({
      ...key,
      office: await context.dataLoader.officeLoader.load(key.officeId),
      type: types.find((t) => t.id === key.typeId),
      status: key.status as KeyStatus,
    })),
  )
}

export const getKeysByPropertyId = async (
  args: GetPropertyKeysArgs,
  context: ServerContext,
): Promise<QueryGetPropertyKeysReturn> => {
  const traceId = context.traceId
  logger.info('getPropertyKeys', { traceId, args })
  const keys = await callGetPropertyKeysAPI(args, context)
  return convertPlatformKeysToKeys(keys._embedded, context)
}

export const getKeyById = async (args: GetKeyArgs, context: ServerContext): GetKeyReturn => {
  const traceId = context.traceId
  logger.info('getKeyById', { traceId, args })
  const key = await callGetKeyAPI(args, context)
  const [keyResult] = await convertPlatformKeysToKeys([key], context)
  return keyResult
}

export const createKey = async (args: CreateKeyArgs, context: ServerContext): CreateKeyReturn => {
  const traceId = context.traceId
  logger.info('createKey', { traceId, args })
  const key = await callCreateKeyAPI(args, context)
  const [keyResult] = await convertPlatformKeysToKeys([key], context)
  return keyResult
}

const convertPlatformMovementToMovement = async (
  movements: APIResultKeyMovement[],
  context: ServerContext,
): Promise<PropertyKeyMovement[]> => {
  return Promise.all(
    movements.map(async (movement) => ({
      ...movement,
      checkInNegotiator:
        movement.checkInNegotiatorId && (await context.dataLoader.negotiatorLoader.load(movement.checkInNegotiatorId)),
      checkOutNegotiator:
        movement.checkOutNegotiatorId &&
        (await context.dataLoader.negotiatorLoader.load(movement.checkOutNegotiatorId)),
      checkOutToContact:
        movement.checkOutToType === 'contact' &&
        movement.checkOutToId &&
        (await context.dataLoader.contactLoader.load(movement.checkOutToId)),
      checkOutToNegotiator:
        movement.checkOutToType === 'negotiator' &&
        movement.checkOutToId &&
        (await context.dataLoader.negotiatorLoader.load(movement.checkOutToId)),
    })),
  )
}

export const getKeyMovements = async (
  args: GetKeyMovementsArgs,
  context: ServerContext,
): Promise<QueryGetPropertyKeyMovementsReturn> => {
  const traceId = context.traceId
  logger.info('getKeyMovements', { traceId, args })
  const movements = await callGetKeyMovementsAPI(args, context)
  return await convertPlatformMovementToMovement(movements._embedded, context)
}

export const getKeyMovement = async (
  args: GetKeyMovementArgs,
  context: ServerContext,
): Promise<QueryGetPropertyKeyMovementReturn> => {
  const traceId = context.traceId
  logger.info('getKeyMovement', { traceId, args })
  const movement = await callGetKeyMovementAPI(args, context)
  const [convertedMovement] = await convertPlatformMovementToMovement([movement], context)
  return convertedMovement
}

export const createKeyMovement = async (
  args: CreateKeyMovementArgs,
  context: ServerContext,
): Promise<MutationCreateKeyMovementReturn> => {
  const traceId = context.traceId
  logger.info('createKeyMovement', { traceId, args })
  const movement = await callCreateKeyMovementAPI(args, context)
  const [convertedMovement] = await convertPlatformMovementToMovement([movement], context)
  return convertedMovement
}

export const updateKeyMovement = async (
  args: UpdateKeyMovementArgs,
  context: ServerContext,
): Promise<MutationUpdateKeyMovementReturn> => {
  const traceId = context.traceId
  logger.info('updateKeyMovement', { traceId, args })
  const movement = await callUpdateKeyMovementAPI(args, context)
  const [convertedMovement] = await convertPlatformMovementToMovement([movement], context)
  return convertedMovement
}

const propertyServices = {
  getKeysByPropertyId,
  getKeyById,
  createKey,
  getKeyMovements,
  getKeyMovement,
  createKeyMovement,
  updateKeyMovement,
}

export default propertyServices
