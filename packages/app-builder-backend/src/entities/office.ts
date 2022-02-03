import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: '@labelKeys(name) @supportsCustomFields()' })
export class Office {
  @Field(() => ID)
  id: string

  @Field()
  name: string

  metadata?: any
}
