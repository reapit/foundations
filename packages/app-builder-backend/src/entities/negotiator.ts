import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: '@labelKeys(name)' })
export class Negotiator {
  @Field(() => ID)
  id: string

  @Field()
  name: string
}

export const NegotiatorFragment = gql`
  fragment NegotiatorFragment on NegotiatorModel {
    id
    name
  }
`
