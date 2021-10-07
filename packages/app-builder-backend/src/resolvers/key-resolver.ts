import { gql } from 'apollo-server-core'
import { Resolver, Query, Ctx, Arg, Mutation, registerEnumType, Field, InputType, Authorized } from 'type-graphql'
import { Context } from '../types'
import { Key, APIKey, KeyFragment, KeyMovement } from '../entities/key'
import { query } from '../utils/graphql-fetch'

const getPropertyKeysQuery = gql`
  ${KeyFragment}
  query getPropertyKeys($propertyId: String!) {
    GetPropertyKeys(propertyId: $propertyId) {
      ...KeyFragment
    }
  }
`

const getPropertyKeyQuery = gql`
  ${KeyFragment}
  query GetKey($propertyId: ID!, $keyId: ID!) {
    GetKey(propertyId: $propertyId, keyId: $keyId) {
      ...KeyFragment
    }
  }
`

const createKeyMovementMutation = gql`
  mutation createKeyMovement($propertyId: String!, $keyId: String!, $movement: KeyMovementModelInput) {
    CreateKeyMovement(propertyId: $propertyId, keyId: $keyId, movement: $movement)
  }
`

const updateKeyMovementMutation = gql`
  ${KeyFragment}
  mutation updateKeyMovement(
    $propertyId: String!
    $keyId: String!
    $movementId: String!
    $checkInNegotiatorId: String!
  ) {
    UpdateKeyMovement(
      propertyId: $propertyId
      keyId: $keyId
      movementId: $movementId
      checkInNegotiatorId: $checkInNegotiatorId
    )
  }
`

const getPropertyKeys = async (propertyId: string, accessToken: string, idToken: string) => {
  return query<APIKey[]>(getPropertyKeysQuery, { propertyId }, 'GetPropertyKeys', { accessToken, idToken })
}

const getPropertyKey = async (propertyId: string, keyId: string, accessToken: string, idToken: string) => {
  return query<APIKey>(getPropertyKeyQuery, { propertyId, keyId }, 'GetKey', { accessToken, idToken })
}

enum CheckOutToType {
  negotiator = 'negotiator',
  contact = 'contact',
}

registerEnumType(CheckOutToType, {
  name: 'CheckOutToType',
})

class KeyMovementModelAPIInput {
  checkInRequired: Boolean
  checkOutToId: String
  checkOutToType: CheckOutToType
  checkOutNegotiatorId: string
}

@InputType()
class KeyMovementModelInput {
  @Field()
  checkInRequired: boolean

  @Field({ nullable: true, description: '@idOf(Contact)' })
  checkOutToContactId?: string

  @Field({ nullable: true, description: '@idOf(Negotiator)' })
  checkOutToNegotiatorId?: string

  @Field({ description: '@idOf(Negotiator)' })
  checkOutNegotiatorId: string
}

const createPropertyKeyMovement = async (
  propertyId: string,
  keyId: string,
  movement: KeyMovementModelAPIInput,
  accessToken: string,
  idToken: string,
) => {
  return query<APIKey>(createKeyMovementMutation, { propertyId, keyId, movement }, 'CreateKeyMovement', {
    accessToken,
    idToken,
  })
}

const updatePropertyKeyMovement = async (
  propertyId: string,
  keyId: string,
  movementId: string,
  checkInNegotiatorId: string,
  accessToken: string,
  idToken: string,
) => {
  return query<APIKey>(
    updateKeyMovementMutation,
    { propertyId, keyId, checkInNegotiatorId, movementId },
    'UpdateKeyMovement',
    {
      accessToken,
      idToken,
    },
  )
}

const undefinedIfNoId = <T>(idObj: (T & { id?: string }) | undefined) => {
  return idObj && idObj.id ? idObj : undefined
}

const cleanMovement = (movement: KeyMovement): KeyMovement => ({
  ...movement,
  checkOutToNegotiator: undefinedIfNoId(movement.checkOutToNegotiator),
  checkOutToContact: undefinedIfNoId(movement.checkOutToContact),
  checkInNegotiator: undefinedIfNoId(movement.checkInNegotiator),
  checkOutNegotiator: undefinedIfNoId(movement.checkOutNegotiator),
})

const APIKeyToKey = (key: APIKey): Key => ({
  ...key,
  type: key.type.value,
  movements: key.movements.map(cleanMovement),
})

@Resolver(() => Key)
export class KeyResolver {
  constructor() {}

  @Query(() => [Key])
  @Authorized()
  async listPropertyKeys(@Arg('propertyId') propertyId: string, @Ctx() ctx: Context): Promise<Key[]> {
    const { accessToken, idToken } = ctx
    const keys = await getPropertyKeys(propertyId, accessToken, idToken)
    return keys?.map(APIKeyToKey) || []
  }

  @Authorized()
  @Query(() => [KeyMovement])
  async listPropertyKeyMovements(
    @Arg('propertyId') propertyId: string,
    @Arg('keyId') keyId: string,
    @Ctx() ctx: Context,
  ): Promise<KeyMovement[]> {
    const { accessToken, idToken } = ctx
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return key.movements.map(cleanMovement)
  }

  @Authorized()
  @Query(() => KeyMovement)
  async getPropertyKeyMovement(
    @Arg('propertyId') propertyId: string,
    @Arg('keyId') keyId: string,
    @Arg('movementId') movementId: string,
    @Ctx() ctx: Context,
  ): Promise<KeyMovement> {
    const { accessToken, idToken } = ctx
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    const movement = key.movements.find((m) => m.id === movementId)
    if (!movement) {
      throw new Error('movement not found')
    }
    return cleanMovement(movement)
  }

  @Authorized()
  @Query(() => Key)
  async getPropertyKey(
    @Arg('propertyId') propertyId: string,
    @Arg('keyId') keyId: string,
    @Ctx() ctx: Context,
  ): Promise<Key> {
    const { accessToken, idToken } = ctx
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return APIKeyToKey(key)
  }

  @Authorized()
  @Mutation(() => Key)
  async checkOutKey(
    @Arg('propertyId') propertyId: string,
    @Arg('keyId') keyId: string,
    @Arg('movement', () => KeyMovementModelInput) movement: KeyMovementModelInput,
    @Ctx() ctx: Context,
  ): Promise<Key> {
    const { accessToken, idToken } = ctx
    const checkOutToId = movement.checkOutToContactId || movement.checkOutToNegotiatorId
    if (!checkOutToId) {
      throw new Error('checkOutToId is required')
    }
    await createPropertyKeyMovement(
      propertyId,
      keyId,
      {
        ...movement,
        checkOutToType: movement.checkOutNegotiatorId ? CheckOutToType.negotiator : CheckOutToType.contact,
        checkOutToId,
      },
      accessToken,
      idToken,
    )
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return APIKeyToKey(key)
  }

  @Authorized()
  @Mutation(() => Key)
  async checkInKey(
    @Arg('propertyId') propertyId: string,
    @Arg('keyId') keyId: string,
    @Arg('movementId') movementId: string,
    @Arg('checkInNegotiatorId') checkInNegotiatorId: string,
    @Ctx() ctx: Context,
  ): Promise<Key> {
    const { accessToken, idToken } = ctx
    await updatePropertyKeyMovement(propertyId, keyId, movementId, checkInNegotiatorId, accessToken, idToken)
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return APIKeyToKey(key)
  }
}
