import { gql } from 'apollo-server-core'
import { Resolver, Query, Ctx, Arg, Mutation, registerEnumType, Field, InputType, Authorized, ID } from 'type-graphql'
import { DateTime } from 'luxon'
import { Context } from '../types'
import { Key, APIKey, KeyFragment, KeyMovement, MovementFragment } from '../entities/key'
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
  ${MovementFragment}
  mutation createKeyMovement($propertyId: ID!, $keyId: ID!, $movement: KeyMovementModelInput) {
    CreateKeyMovement(propertyId: $propertyId, keyId: $keyId, movement: $movement) {
      ...MovementFragment
    }
  }
`

const updateKeyMovementMutation = gql`
  ${MovementFragment}
  mutation updateKeyMovement($propertyId: ID!, $keyId: ID!, $movementId: ID!, $checkInNegotiatorId: String!) {
    UpdateKeyMovement(
      propertyId: $propertyId
      keyId: $keyId
      movementId: $movementId
      checkInNegotiatorId: $checkInNegotiatorId
    ) {
      ...MovementFragment
    }
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

const undefinedIfNoId = <T>(idObj: (T & { id?: string | number }) | undefined) => {
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

@InputType()
class CheckIn {
  @Field({ description: '@idOf(Negotiator)' })
  negotiatorId: string
}

const getLatestMovement = (movements: KeyMovement[]): KeyMovement | undefined => {
  return movements
    .filter((m) => !m.checkInAt)
    .sort((a, b) => {
      if (b.checkOutAt && a.checkOutAt) {
        const aCheckOutAt = DateTime.fromISO(a.checkOutAt)
        const bCheckOutAt = DateTime.fromISO(b.checkOutAt)
        return bCheckOutAt.diff(aCheckOutAt).milliseconds
      }
      return -1
    })[0]
}

@Resolver(() => Key)
export class KeyResolver {
  constructor() {}

  @Query(() => [Key])
  @Authorized()
  async listPropertyKeys(@Arg('propertyId', () => ID) propertyId: string, @Ctx() ctx: Context): Promise<Key[]> {
    const { accessToken, idToken } = ctx
    const keys = await getPropertyKeys(propertyId, accessToken, idToken)
    return keys?.map(APIKeyToKey) || []
  }

  @Authorized()
  @Query(() => [KeyMovement])
  async listPropertyKeyMovements(
    @Arg('propertyId', () => ID) propertyId: string,
    @Arg('keyId', () => ID) keyId: string,
    @Ctx() ctx: Context,
  ): Promise<KeyMovement[]> {
    const { accessToken, idToken } = ctx
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return key.movements.map(cleanMovement)
  }

  @Authorized()
  @Query(() => KeyMovement)
  async getPropertyKeyMovement(
    @Arg('propertyId', () => ID) propertyId: string,
    @Arg('keyId', () => ID) keyId: string,
    @Arg('movementId', () => ID) movementId: string,
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
    @Arg('propertyId', () => ID) propertyId: string,
    @Arg('keyId', () => ID) keyId: string,
    @Ctx() ctx: Context,
  ): Promise<Key> {
    const { accessToken, idToken } = ctx
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return APIKeyToKey(key)
  }

  @Authorized()
  @Mutation(() => Key)
  async checkOutKey(
    @Arg('propertyId', () => ID) propertyId: string,
    @Arg('keyId', () => ID) keyId: string,
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
        checkInRequired: movement.checkInRequired,
        checkOutNegotiatorId: movement.checkOutNegotiatorId,
        checkOutToType: movement.checkOutToNegotiatorId ? CheckOutToType.negotiator : CheckOutToType.contact,
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
    @Arg('propertyId', () => ID) propertyId: string,
    @Arg('keyId', () => ID) keyId: string,
    @Arg('checkIn') checkIn: CheckIn,
    @Ctx() ctx: Context,
  ): Promise<Key> {
    const { accessToken, idToken } = ctx
    const movements = await this.listPropertyKeyMovements(propertyId, keyId, ctx)

    const latestMovement = getLatestMovement(movements)

    if (!latestMovement) {
      throw new Error('Key is not currently checked out')
    }
    await updatePropertyKeyMovement(propertyId, keyId, latestMovement.id, checkIn.negotiatorId, accessToken, idToken)
    const key = await getPropertyKey(propertyId, keyId, accessToken, idToken)
    return APIKeyToKey(key)
  }
}
