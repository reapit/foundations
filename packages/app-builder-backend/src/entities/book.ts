import { ObjectType, Field, ID, InputType } from 'type-graphql'
import { Author } from './author'
import { Genre } from './genre'

@ObjectType()
export class Book {
  @Field(() => ID)
  id: number

  @Field()
  title: string

  @Field(() => Genre)
  genre: Genre

  @Field({ nullable: true })
  description?: string

  @Field(() => Author)
  author: Author
}

@InputType()
export class BookInput {
  @Field()
  title: string

  @Field(() => Genre)
  genre: Genre

  @Field({ nullable: true })
  description?: string

  @Field(() => ID)
  authorId: string | number
}
