import { gql } from 'apollo-server-core'
import { Field, InputType, ObjectType, registerEnumType } from 'type-graphql'

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

export enum PropertyImageType {
  photograph = 'photograph',
  floorPlan = 'floorPlan',
  epc = 'epc',
  map = 'map',
}
registerEnumType(PropertyImageType, {
  name: 'PropertyImageType',
  description: 'The type of image',
})

@ObjectType()
export class PropertyImage {
  @Field()
  id: string

  @Field({ description: '@urlType("image")' })
  url: string

  @Field(() => PropertyImageType)
  type: PropertyImageType

  @Field()
  caption: string
}

@InputType()
export class PropertyImageInput {
  @Field({ description: '@customInput(image-upload)' })
  data: string

  @Field()
  caption: string

  @Field({ description: '@idOf(Property)' })
  propertyId: string

  @Field(() => PropertyImageType, { nullable: true })
  type: PropertyImageType
}
