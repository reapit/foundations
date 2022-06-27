import { gql } from 'apollo-server-core'
import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export class Offer {
  @Field()
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field()
  currency: string

  @Field()
  applicantId: string

  @Field()
  propertyId: string

  @Field({ nullable: true })
  offerId?: string

  @Field()
  date: string

  @Field()
  amount: string

  @Field()
  status: string

  @Field()
  inclusions: string

  @Field()
  exclusions: string

  @Field()
  conditions: string

  metadata: any
}

@InputType()
export class OfferInput {
  @Field()
  currency: string

  @Field()
  applicantId: string

  @Field()
  propertyId: string

  @Field({ nullable: true })
  OfferId: string

  @Field()
  date: string

  @Field()
  amount: string

  @Field()
  status: string

  @Field()
  inclusions: string

  @Field()
  exclusions: string

  @Field()
  conditions: string
}

export const OfferFragment = gql`
  fragment OfferFragment on OfferModel {
    id
    created
    modified
    currency
    applicantId
    propertyId
    OfferId
    date
    amount
    status
    inclusions
    exclusions
    conditions
    metadata
  }
`
