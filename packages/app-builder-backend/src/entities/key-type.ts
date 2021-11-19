import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: '@labelKeys(value)' })
export class KeyType {
  @Field(() => ID)
  id: string

  @Field()
  value: string
}
