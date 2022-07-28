import { gql } from 'apollo-server-core'
import { Field, GraphQLISODateTime, ID, InputType, ObjectType } from 'type-graphql'
import { Contact } from './contact'
import { Negotiator, NegotiatorFragment } from './negotiator'
import { Office, OfficeFragment } from './office'
import { Property, PropertyFragment } from './property'

@ObjectType({ description: '@labelKeys(value) @notTopLevel()' })
export class AppointmentType {
  @Field(() => ID)
  id: string

  @Field()
  value: string
}

@ObjectType()
export class Appointment {
  @Field()
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field(() => String, { nullable: false })
  start?: Date

  @Field(() => String, { nullable: false })
  end?: Date

  @Field(() => AppointmentType, { nullable: true })
  type?: AppointmentType

  typeId?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => Property, { nullable: true })
  property?: Property

  @Field({ nullable: true })
  organiserId?: string

  @Field(() => [Negotiator])
  negotiators?: Negotiator[]

  attendeeInfo: {
    id: string
    type: string
  }

  @Field(() => [Office])
  offices?: Office[]

  @Field(() => Contact, { nullable: true })
  attendee?: Contact

  metadata?: any
}

@InputType()
export class AppointmentInput {
  @Field(() => GraphQLISODateTime)
  start?: Date

  @Field(() => GraphQLISODateTime)
  end?: Date

  @Field({ nullable: true, description: '@idOf(AppointmentType)' })
  typeId?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => String, { nullable: true, description: '@idOf(Property)' })
  propertyId?: string

  @Field({ description: '@idOf(Negotiator)' })
  organiserId?: string

  @Field(() => [String], { description: '@idOf(Negotiator)' })
  negotiatorIds: string[]

  @Field(() => [String], { description: '@idOf(Office)' })
  officeIds: string[]

  @Field({ description: '@idOf(Contact)' })
  attendeeId: string

  metadata?: any
}

export const AppointmentFragment = gql`
  ${PropertyFragment}
  ${NegotiatorFragment}
  ${OfficeFragment}
  fragment AppointmentFragment on AppointmentModel {
    id
    created
    modified
    start
    end
    recurring
    cancelled
    description
    typeId
    followUp {
      due
      responseId
      notes
    }
    attendee {
      type
      id
      contacts {
        id
        name
        workPhone
        homePhone
        mobilePhone
        email
      }
    }
    virtual
    organiserId
    accompanied
    negotiatorConfirmed
    attendeeConfirmed
    propertyConfirmed

    _embedded {
      offices {
        ...OfficeFragment
      }
      negotiators {
        ...NegotiatorFragment
      }
      property {
        ...PropertyFragment
      }
    }
  }
`
