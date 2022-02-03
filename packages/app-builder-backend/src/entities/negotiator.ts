import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: '@labelKeys(name) @supportsCustomFields()' })
export class Negotiator {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  metadata?: any
}

export const NegotiatorFragment = gql`
  fragment NegotiatorFragment on NegotiatorModel {
    id
    name
    metadata
  }
`
