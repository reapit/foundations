import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID, InputType, GraphQLISODateTime } from 'type-graphql'

@ObjectType({ description: '@labelKeys(name) @supportsCustomFields()' })
export class Negotiator {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field({ nullable: true })
  jobTitle: String

  @Field()
  active: boolean

  @Field({ description: '@idOf(Office)' })
  officeId: string

  @Field({ nullable: true })
  workPhone: string

  @Field({ nullable: true })
  mobilePhone: string

  @Field()
  email: string

  metadata?: any
}

@InputType()
export class NegotiatorInput {
  @Field()
  name: string

  @Field({ nullable: true })
  jobTitle: String

  @Field()
  active: boolean

  @Field()
  officeId: string

  @Field({ nullable: true })
  workPhone: string

  @Field({ nullable: true })
  mobilePhone: string

  @Field()
  email: string

  metadata: any
}

export const NegotiatorFragment = gql`
  fragment NegotiatorFragment on NegotiatorModel {
    id
    name
    created
    modified
    jobTitle
    active
    officeId
    workPhone
    mobilePhone
    email
    metadata
  }
`
