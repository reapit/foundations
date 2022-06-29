import { gql } from 'apollo-server-core'
import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql'
import { Negotiator, NegotiatorFragment } from './negotiator'
import { Office, OfficeFragment } from './office'
import { Property, PropertyFragment } from './property'

@ObjectType()
class AppointmentContact {
  @Field()
  id: string

  @Field()
  name: string

  @Field({ nullable: true })
  homePhone?: string

  @Field({ nullable: true })
  workPhone?: string

  @Field({ nullable: true })
  mobilePhone?: string

  @Field({ nullable: true })
  email?: string
}

@ObjectType()
class AppointmentAttendee {
  @Field()
  id: string

  @Field()
  type: string

  @Field(() => AppointmentContact)
  contact: AppointmentContact
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

  @Field({ nullable: true })
  typeId?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => Property, { nullable: true })
  property?: Property

  @Field({ nullable: true })
  organiserId?: string

  @Field(() => [Negotiator])
  negotiators?: Negotiator[]

  @Field(() => [Office])
  offices?: Office[]

  @Field(() => [AppointmentAttendee])
  attendees: AppointmentAttendee[]

  metadata?: any
}


@InputType()
class AppointmentContactInput {
  @Field()
  name: string

  @Field({ nullable: true })
  homePhone?: string

  @Field({ nullable: true })
  workPhone?: string

  @Field({ nullable: true })
  mobilePhone?: string

  @Field({ nullable: true })
  email?: string
}

@InputType()
class AppointmentAttendeeInput {
  @Field()
  type: string

  @Field(() => AppointmentContactInput)
  contact: AppointmentContactInput
}

@InputType()
export class AppointmentInput {
  @Field(() => String)
  start?: Date

  @Field(() => String)
  end?: Date

  @Field({ nullable: true })
  typeId?: string

  @Field({ nullable: true })
  description?: string

  @Field(() => String, { nullable: true, description: '@idOf(Property)' })
  propertyId?: string

  @Field()
  organiserId?: string

  @Field(() => [String], { description: '@idOf(Negotiator)' })
  negotiatorIds: string[]

  @Field(() => [String], { description: '@idOf(Office)' })
  officeIds: string[]

  @Field(() => [AppointmentAttendeeInput])
  attendees: AppointmentAttendeeInput[]

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
