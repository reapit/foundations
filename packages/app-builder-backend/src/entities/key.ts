import { ObjectType, Field, ID, registerEnumType, GraphQLISODateTime } from 'type-graphql'
import { gql } from 'apollo-server-core'
import { Contact, ContactFragment } from './contact'
import { Negotiator, NegotiatorFragment } from './negotiator'

export const MovementFragment = gql`
  ${NegotiatorFragment}
  ${ContactFragment}

  fragment MovementFragment on KeyMovementModel {
    id
    created
    modified
    checkInAt
    checkOutAt
    checkOutToContact {
      ...ContactFragment
    }
    checkOutToNegotiator {
      ...NegotiatorFragment
    }
    checkInNegotiator {
      ...NegotiatorFragment
    }
    checkOutNegotiator {
      ...NegotiatorFragment
    }
  }
`

export const KeyFragment = gql`
  ${MovementFragment}
  fragment KeyFragment on KeyModel {
    id
    status
    number
    type {
      value
    }
    keysInSet {
      name
      description
    }
    movements {
      ...MovementFragment
    }
  }
`

export type APIKey = {
  id: string
  status: KeyStatus
  number: string
  type: {
    value: string
  }
  keysInSet: {
    name: string
    description: string
  }[]
  movements: KeyMovement[]
}

enum KeyStatus {
  checkedIn = 'checkedIn',
  checkedOut = 'checkedOut',
  noLongerHeld = 'noLongerHeld',
}

registerEnumType(KeyStatus, {
  name: 'KeyStatus',
  description: 'The status of a key',
})

@ObjectType()
export class KeyMovement {
  @Field(() => ID)
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field({ nullable: true })
  checkInAt?: string

  @Field({ nullable: true })
  checkOutAt?: string

  @Field(() => Contact, { nullable: true })
  checkOutToContact?: Contact

  @Field(() => Negotiator, { nullable: true })
  checkOutToNegotiator?: Negotiator

  @Field(() => Negotiator, { nullable: true })
  checkInNegotiator?: Negotiator

  @Field(() => Negotiator, { nullable: true })
  checkOutNegotiator?: Negotiator
}

@ObjectType()
export class IndividualKey {
  @Field()
  name: string

  @Field({ nullable: true })
  description?: string
}

@ObjectType()
export class Key {
  @Field(() => ID)
  id: string

  @Field()
  number: string

  @Field(() => KeyStatus)
  status: KeyStatus

  @Field()
  type: string

  @Field(() => [IndividualKey])
  keysInSet: IndividualKey[]

  @Field(() => [KeyMovement])
  movements: KeyMovement[]
}
