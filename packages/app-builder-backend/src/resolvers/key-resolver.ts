import { gql } from 'apollo-server-core'
import { Resolver, Query, Ctx, Arg, Mutation, registerEnumType } from 'type-graphql'
import { Context } from '@/types'
import { Key, APIKey, KeyFragment, KeyMovement } from '@/entities/key'
import { query } from '@/utils/graphqlFetch'

const getPropertyKeysQuery = gql`
  ${KeyFragment}
  query getPropertyKeys($propertyId: ID!) {
    GetPropertyKeys(propertyId: $propertyId) {
      ...KeyFragment
    }
  }
`

const getPropertyKeyQuery = gql`
  ${KeyFragment}
  query getPropertyKey($propertyId: ID!, $keyId: ID!) {
    GetPropertyKey(propertyId: $propertyId, keyId: $keyId) {
      ...KeyFragment
    }
  }
`

const createKeyMovementMutation = gql`
  mutation createKeyMovement($propertyId: ID!, $keyId: ID!, $movement: KeyMovementModelInput) {
    CreateKeyMovement(propertyId: $propertyId, keyId: $keyId, movement: $movement)
  }
`

const updateKeyMovementMutation = gql`
  ${KeyFragment}
  mutation updateKeyMovement($propertyId: ID!, $keyId: ID!, $movementId: ID!, $checkInNegotiatorId: ID!) {
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
  return query<APIKey>(getPropertyKeyQuery, { propertyId, keyId }, 'GetPropertyKey', { accessToken, idToken })
}

enum CheckOutToType {
  negotiator = 'negotiator',
  contact = 'contact',
}

registerEnumType(CheckOutToType, {
  name: 'CheckOutToType',
})

type KeyMovementModelInput = {
  checkInRequired: boolean
  checkOutToId: string
  checkOutToType: CheckOutToType
  chedckOutNegotiatorId: string
}

const createPropertyKeyMovement = async (
  propertyId: string,
  keyId: string,
  movement: KeyMovementModelInput,
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
  return query<APIKey>(updateKeyMovementMutation, { propertyId, keyId, checkInNegotiatorId }, 'UpdateKeyMovement', {
    accessToken,
    idToken,
  })
}

const APIKeyToKey = (key: APIKey): Key => ({
  ...key,
  type: key.type.value,
})

@Resolver(() => Key)
export class PropertyResolver {
  constructor() {}

  @Query(() => [Key])
  async listPropertyKeys(@Arg('propertyId') propertyId: string, @Ctx() ctx: Context): Promise<Key[]> {
    const { accessToken, idToken } = ctx
    if (!accessToken || !idToken) {
      throw new Error('unauthorized')
    }
    const keys = await getPropertyKeys(propertyId, accessToken, idToken)
    return keys?.map(APIKeyToKey) || []
  }

  @Query(() => [KeyMovement])
  async listPropertyKeyMovements(
    @Arg('propertyId') propertyId: string,
    @Arg('keyId') keyId: string,
    @Ctx() ctx: Context,
  ): Promise<KeyMovement[]> {
    const { accessToken, idToken } = ctx
    if (!accessToken || !idToken) {
      throw new Error('unauthorized')
    }
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return key.movements
  }

  @Query(() => KeyMovement)
  async getPropertyKeyMovement(
    @Arg('propertyId') propertyId: string,
    @Arg('keyId') keyId: string,
    @Arg('movementId') movementId: string,
    @Ctx() ctx: Context,
  ): Promise<KeyMovement> {
    const { accessToken, idToken } = ctx
    if (!accessToken || !idToken) {
      throw new Error('unauthorized')
    }
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    const movement = key.movements.find((m) => m.id === movementId)
    if (!movement) {
      throw new Error('movement not found')
    }
    return movement
  }

  @Query(() => Key)
  async getPropertyKey(
    @Arg('propertyId') propertyId: string,
    @Arg('keyId') keyId: string,
    @Ctx() ctx: Context,
  ): Promise<Key> {
    const { accessToken, idToken } = ctx
    if (!accessToken || !idToken) {
      throw new Error('unauthorized')
    }
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return APIKeyToKey(key)
  }

  @Mutation(() => Key)
  async createPropertyKeyMovement(
    @Arg('propertyId') propertyId: string,
    @Arg('keyId') keyId: string,
    @Arg('movement') movement: KeyMovementModelInput,
    @Ctx() ctx: Context,
  ): Promise<Key> {
    const { accessToken, idToken } = ctx
    if (!accessToken || !idToken) {
      throw new Error('unauthorized')
    }
    await createPropertyKeyMovement(propertyId, keyId, movement, accessToken, idToken)
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return APIKeyToKey(key)
  }

  @Mutation(() => Key)
  async updatePropertyKeyMovement(
    @Arg('propertyId') propertyId: string,
    @Arg('keyId') keyId: string,
    @Arg('movementId') movementId: string,
    @Arg('checkInNegotiatorId') checkInNegotiatorId: string,
    @Ctx() ctx: Context,
  ): Promise<Key> {
    const { accessToken, idToken } = ctx
    if (!accessToken || !idToken) {
      throw new Error('unauthorized')
    }
    await updatePropertyKeyMovement(propertyId, keyId, movementId, checkInNegotiatorId, accessToken, idToken)
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return APIKeyToKey(key)
  }
}
