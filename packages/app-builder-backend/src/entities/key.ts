import { ObjectType, Field, ID, registerEnumType } from 'type-graphql'
import { gql } from 'apollo-server-core'

export const NegotiatorFragment = gql`
  fragment NegotiatorFragment on NegotiatorModel {
    id
    name
  }
`

export const ContactFragment = gql`
  fragment ContactFragment on ContactModel {
    id
    forename
    surname
  }
`

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
export class Negotiator {
  @Field(() => ID)
  id: string

  @Field()
  name: string
}

@ObjectType()
export class Contact {
  @Field(() => ID)
  id: string

  @Field()
  forename: string

  @Field()
  surname: string
}

@ObjectType()
export class KeyMovement {
  @Field(() => ID)
  id: string

  @Field()
  created: string

  @Field()
  modified: string

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

  @Field(() => KeyStatus)
  status: KeyStatus

  @Field()
  type: string

  @Field(() => [IndividualKey])
  keysInSet: IndividualKey[]

  @Field(() => [KeyMovement])
  movements: KeyMovement[]
}
