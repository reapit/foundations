import { gql } from 'apollo-server-core'
import { Field, GraphQLISODateTime, InputType, ObjectType } from 'type-graphql'

export const PropertyImageFragment = gql`
  fragment PropertyImageFragment on PropertyImageModel {
    id
    created
    modified
    url
    type
    order
    caption
  }
`

@ObjectType({ description: '@notTopLevel()' })
export class PropertyImage {
  @Field()
  id: string

  @Field(() => GraphQLISODateTime)
  created: Date

  @Field(() => GraphQLISODateTime)
  modified: Date

  @Field()
  url: string

  @Field()
  type: string

  @Field({ nullable: true })
  order: number

  @Field()
  caption: string
}

@InputType()
export class PropertyImageInput {
  @Field({ description: '@customInput(image-upload)' })
  data: string

  @Field({ nullable: true })
  caption: string

  @Field({ description: '@idOf(Property)' })
  propertyId: string

  @Field({ nullable: true })
  type: string

  @Field({ nullable: true })
  order: number
}
