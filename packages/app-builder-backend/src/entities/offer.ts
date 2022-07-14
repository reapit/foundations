import { gql } from 'apollo-server-core'
import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql'
import { Applicant, ApplicantFields } from './applicant'
import { Negotiator, NegotiatorFragment } from './negotiator'
import { Property, PropertyFragment } from './property'

@ObjectType()
export class Offer {
  @Field()
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field(() => Applicant, { nullable: true })
  applicant?: Applicant

  @Field(() => Property, { nullable: true })
  property?: Property

  @Field(() => Negotiator, { nullable: true })
  negotiator?: Negotiator

  @Field()
  date: string

  @Field()
  amount: string

  @Field()
  status: string

  metadata: any
}

@InputType()
export class OfferInput {
  @Field()
  currency: string

  @Field({ description: '@idOf(Applicant)' })
  applicantId: string

  @Field({ description: '@idOf(Property)' })
  propertyId: string

  @Field({ description: '@idOf(Negotiator)' })
  negotiatorId: String

  @Field({ nullable: true })
  offerId: string

  @Field()
  date: string

  @Field()
  amount: string

  @Field()
  status: string
}

export const OfferFragment = gql`
  ${NegotiatorFragment}
  ${PropertyFragment}
  fragment OfferFragment on OfferModel {
    id
    created
    modified
    currency
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
  }
`
