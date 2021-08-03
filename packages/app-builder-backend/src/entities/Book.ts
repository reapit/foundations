import { ObjectType, Field, ID } from 'type-graphql'
import { Author } from './Author'

@ObjectType()
export class Book {
  @Field(() => ID)
  id: number

  @Field()
  title: string

  @Field()
  genre: string

  @Field({ nullable: true })
  description?: string

  @Field(() => Author)
  author: Author
}
