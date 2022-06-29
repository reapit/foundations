import { gql } from 'apollo-server-core'
import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql'
import { Applicant, ApplicantFragment } from './applicant'
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

  @Field(() => Applicant)
  applicant: Applicant

  @Field(() => Property)
  property: Property

  @Field(() => Negotiator)
  negotiator: String

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
  OfferId: string

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
  ${ApplicantFragment}
  fragment OfferFragment on OfferModel {
    id
    created
    modified
    currency
    applicant {
      ...ApplicantFragment
    }
    property {
      ...PropertyFragment
    }
    negotiator {
      ...NegotiatorFragment
    }
    date
    amount
    status
    metadata
  }
`
