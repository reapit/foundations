import keyServices from './services'
import { resolverHandler, ServerContext } from '../../utils'
import {
  GetKeyArgs,
  PropertyKey,
  GetPropertyKeysArgs,
  QueryGetKeyReturn,
  QueryGetPropertyKeysReturn,
  CreateKeyArgs,
  MutationCreateKeyReturn,
  CreateKeyMovementArgs,
  CreateKeyMovementReturn,
  UpdateKeyMovementArgs,
  UpdateKeyMovementReturn,
  QueryGetPropertyKeyMovementsReturn,
} from './keys'
import { PropertyModel } from '@reapit/foundations-ts-definitions'

export const queryGetPropertyKeys = resolverHandler<GetPropertyKeysArgs, QueryGetPropertyKeysReturn>(
  (_: any, args: GetPropertyKeysArgs, context: ServerContext): Promise<QueryGetPropertyKeysReturn> => {
    return keyServices.getKeysByPropertyId(args, context)
  },
)

export const queryGetKey = resolverHandler<GetKeyArgs, QueryGetKeyReturn>(
  (_: any, args: GetKeyArgs, context: ServerContext): Promise<QueryGetKeyReturn> => {
    return keyServices.getKeyById(args, context)
  },
)

export const mutationCreateKey = resolverHandler<CreateKeyArgs, MutationCreateKeyReturn>(
  (_: any, args: CreateKeyArgs, context: ServerContext): Promise<MutationCreateKeyReturn> => {
    return keyServices.createKey(args, context)
  },
)

export const mutationCreateKeyMovement = resolverHandler<CreateKeyMovementArgs, CreateKeyMovementReturn>(
  (_: any, args: CreateKeyMovementArgs, context: ServerContext): CreateKeyMovementReturn => {
    return keyServices.createKeyMovement(args, context)
  },
)

export const mutationUpdateKeyMovement = resolverHandler<UpdateKeyMovementArgs, UpdateKeyMovementReturn>(
  (_: any, args: UpdateKeyMovementArgs, context: ServerContext): UpdateKeyMovementReturn => {
    return keyServices.updateKeyMovement(args, context)
  },
)

export const queryGetKeyMovements = resolverHandler<any, QueryGetPropertyKeyMovementsReturn>(
  (parent: PropertyKey, args: any, context: ServerContext) => {
    return keyServices.getKeyMovements({ keyId: parent.id, propertyId: parent.propertyId }, context)
  },
)

export const queryGetPropertyKeysResolver = resolverHandler<any, QueryGetPropertyKeysReturn>(
  (parent: PropertyModel, args: any, context: ServerContext) => {
    return keyServices.getKeysByPropertyId({ propertyId: parent.id }, context)
  },
)

export default {
  Query: {
    GetPropertyKeys: queryGetPropertyKeys,
    GetKey: queryGetKey,
  },
  Mutation: {
    CreateKey: mutationCreateKey,
    CreateKeyMovement: mutationCreateKeyMovement,
    UpdateKeyMovement: mutationUpdateKeyMovement,
  },
  KeyModel: {
    movements: queryGetKeyMovements,
  },
  PropertyModel: {
    keys: queryGetPropertyKeysResolver,
  },
}
