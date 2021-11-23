import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: '@labelKeys(name)' })
export class Office {
  @Field(() => ID)
  id: string

  @Field()
  name: string
}
