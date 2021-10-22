import { ObjectType, Field, ID } from 'type-graphql'

@ObjectType({ description: '@labelKeys(firstName, lastName)' })
export class Author {
  @Field(() => ID)
  id: number

  @Field()
  firstName: string

  @Field()
  lastName: string
}
