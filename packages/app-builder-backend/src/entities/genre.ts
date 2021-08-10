import { registerEnumType } from 'type-graphql'

export enum Genre {
  ScienceFiction = 'Science Fiction',
  NonFiction = 'Non-Fiction',
  Biography = 'Biography',
  Children = 'Children',
  Horror = 'Horror',
  Thriller = 'Thriller',
}

registerEnumType(Genre, {
  name: 'Genre',
  description: 'Genre of the book',
})
