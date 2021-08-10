import { Resolver, Query, Mutation } from 'type-graphql'
import { Genre } from '../entities/genre'
import { Book } from '../entities/book'
import { authors } from './author-resolver'

const books: Array<Book> = [
  {
    id: 1,
    title: 'The Awakening',
    description: 'Really scary i think',
    genre: Genre.Horror,
    author: authors[0],
  },
  {
    id: 2,
    title: 'City of Glass',
    description: 'Really scary i think',
    genre: Genre.Thriller,
    author: authors[1],
  },
]

@Resolver(() => Book)
export class BookResolver {
  constructor() {}

  @Query(() => [Book])
  async listBooks() {
    return books
  }

  @Mutation(() => Book)
  async createBook(book: Book) {
    const newBook = {
      ...book,
      id: books[books.length + 1].id + 1,
    }
    books.push(newBook)
    return newBook
  }

  @Mutation(() => Book)
  async updateBook(book: Book) {
    const index = books.findIndex((b) => b.id === book.id)
    books[index] = book
    return book
  }

  @Mutation(() => [Book])
  async deleteBook(id: number) {
    const index = books.findIndex((b) => b.id === id)
    books.splice(index, 1)
    return books
  }
}
