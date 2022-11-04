import { gql } from 'apollo-server-core'
import { Field, Float, InputType, ObjectType, registerEnumType } from 'type-graphql'
import { Applicant, ApplicantFields } from './applicant'
import { Negotiator } from './negotiator'
import { Property, PropertyFragment } from './property'
import { GraphQLDate } from 'graphql-iso-date'

export enum OfferStatus {
  pending = 'pending',
  withdrawn = 'withdrawn',
  rejected = 'rejected',
  accepted = 'accepted',
  noteOfInterest = 'noteOfInterest',
}
registerEnumType(OfferStatus, { name: 'OfferStatus' })

@ObjectType()
export class Offer {
  @Field()
  id: string

  @Field(() => Applicant, { nullable: true })
  applicant?: Applicant

  @Field(() => Property, { nullable: true })
  property?: Property

  @Field(() => Negotiator, { nullable: true })
  negotiator?: Negotiator

  @Field(() => GraphQLDate)
  date: Date

  @Field(() => Float)
  amount: number

  @Field(() => OfferStatus)
  status: OfferStatus

  metadata: any
}

@InputType()
export class OfferInput {
  @Field({ description: '@idOf(Applicant)' })
  applicantId: string

  @Field({ description: '@idOf(Property)' })
  propertyId: string

  @Field({ description: '@idOf(Negotiator)' })
  negotiatorId: String

  @Field(() => GraphQLDate)
  date: Date

  @Field(() => Float)
  amount: number

  @Field(() => OfferStatus)
  status: OfferStatus
}

export const OfferFragment = gql`
  ${PropertyFragment}
  fragment OfferFragment on OfferModel {
    id
    created
    modified
    date
    amount
    status
    metadata
    _embedded {
      applicant {
        ${ApplicantFields}
      }
      property {
        ...PropertyFragment
      }
      negotiator {
        ...NegotiatorFragment
      }
    }
    _eTag
  }
`
