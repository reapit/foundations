import { Resolver, Query } from 'type-graphql'
import { Author } from '../entities/author'

export const authors = [
  {
    id: 1,
    firstName: 'Kate',
    lastName: 'Chopin',
  },
  {
    id: 2,
    firstName: 'Paul',
    lastName: 'Gauguin',
  },
]

@Resolver(() => Author)
export class AuthorResolver {
  constructor() {}

  @Query(() => [Author])
  async listAuthors() {
    return authors
  }
}
