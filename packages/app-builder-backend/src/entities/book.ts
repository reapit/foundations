import { ObjectType, Field, ID } from 'type-graphql'
import { Author } from './author'
import { Genre } from './genre'

@ObjectType()
export class Book {
  @Field(() => ID)
  id: number

  @Field()
  title: string

  @Field()
  genre: Genre

  @Field({ nullable: true })
  description?: string

  @Field(() => Author)
  author: Author
}
