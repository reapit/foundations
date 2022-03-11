import { gql } from 'apollo-server-core'
import { ObjectType, Field, ID } from 'type-graphql'

export const OfficeFragment = gql`
  fragment OfficeFragment on OfficeModel {
    id
    name
    metadata
  }
`

@ObjectType({ description: '@labelKeys(name) @supportsCustomFields()' })
export class Office {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  metadata?: any
}
