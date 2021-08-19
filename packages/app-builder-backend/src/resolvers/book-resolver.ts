import { Resolver, Query, Mutation, Arg, ID } from 'type-graphql'
import { Genre } from '../entities/genre'
import { Book, BookInput } from '../entities/book'
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
  async createBook(@Arg('book', { nullable: false }) book: BookInput) {
    const author = authors.find((a) => a.id === book.authorId)
    if (!author) {
      throw new Error('Author not found')
    }
    const newBook = {
      ...book,
      author,
      id: books[books.length + 1].id + 1,
    }
    books.push(newBook)
    return newBook
  }

  @Mutation(() => Book)
  async updateBook(
    @Arg('id', () => ID, { nullable: false }) id: number,
    @Arg('book', { nullable: false }) book: BookInput,
  ) {
    const index = books.findIndex((b) => b.id === id)
    const author = authors.find((a) => a.id === book.authorId)
    if (!author) {
      throw new Error('Author not found')
    }
    books[index] = { ...book, author, id }
    return book
  }

  @Mutation(() => [Book])
  async deleteBook(@Arg('id', () => ID, { nullable: false }) id: number) {
    const index = books.findIndex((b) => b.id === id)
    books.splice(index, 1)
    return books
  }
}
