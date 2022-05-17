import { gql } from 'apollo-server-core'
import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql'
import { Contact, ContactFragment } from './contact'
import { Negotiator } from './negotiator'
import { Office } from './office'
import { Property, PropertyFragment } from './property'

@ObjectType()
class AppointmentRecurrence {
  @Field(() => Number)
  interval?: number

  @Field()
  type: string

  @Field(() => GraphQLISODateTime)
  until: Date
}

@ObjectType()
class AppointmentFollowUp {
  @Field()
  due: string

  @Field()
  responseId: string

  @Field({ nullable: true })
  notes: string
}

@ObjectType()
class AppointmentAttendee {
  @Field()
  id: string

  @Field()
  type: string

  @Field(() => Contact)
  contact: Contact
}

@ObjectType()
export class Appointment {
  @Field()
  id: string

  @Field(() => GraphQLISODateTime)
  firstCreated: Date

  @Field(() => GraphQLISODateTime)
  lastModified: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  startDate?: Date

  @Field(() => GraphQLISODateTime, { nullable: true })
  endDate?: Date

  @Field({ nullable: true })
  typeId?: string

  @Field({ nullable: true })
  description?: string

  @Field()
  recurring: boolean

  @Field(() => AppointmentRecurrence)
  recurrence: AppointmentRecurrence

  @Field()
  cancelled: boolean

  @Field(() => AppointmentFollowUp)
  followUp: AppointmentFollowUp

  @Field(() => Property)
  attachedProperties?: Property

  @Field()
  organiserId?: string

  @Field(() => [Negotiator])
  attachedStaffMemebers?: Negotiator[]

  @Field(() => [Office])
  offices?: Office[]

  @Field(() => [AppointmentAttendee])
  attachedContacts: AppointmentAttendee[]

  @Field()
  accompanied: boolean

  @Field()
  virtual: boolean

  @Field()
  negotiatorConfirmed: boolean

  @Field()
  attendeeConfirmed: boolean

  @Field()
  propertyConfirmed: boolean

  @Field()
  fromArchive: boolean

  metadata?: any
}

@InputType()
export class AppointmentInput {}

export const AppointmentFragment = gql`
  ${PropertyFragment}
  ${ContactFragment}
  fragment AppointmentFragment on AppointmentModel {
    id
    lastCreated
    lastModified
    startDate
    endDate
    recurring
    recurrence {
      interval
      type
      until
    }
    cancelled
    followUp {
      due
      responseId
      notes
    }
    attachedContacts {
      type
      id
      contact {
        ...ContactFragment
      }
    }
    organiserId
    accompanied
    virtual
    negotiatorConfirmed
    attendeeConfirmed
    propertyConfirmed
    fromArchive

    _embedded {
      attachedProperties {
        ...PropertyFragment
      }
      attachedStaffMembers {
        ...NegotiatorFragment
      }
      attachedProperties {
        ...PropertyFragment
      }
    }
  }
`
