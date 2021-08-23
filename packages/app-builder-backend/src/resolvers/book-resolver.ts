import { Resolver, Query, Mutation, Arg, ID, Ctx } from 'type-graphql'
import { Book, BookInput } from '../entities/book'
import { authors } from './author-resolver'
import { Context } from '../types'
import { createBook, deleteBook, listBooks, updateBook } from '../platform/books'

@Resolver(() => Book)
export class BookResolver {
  constructor() {}

  @Query(() => [Book])
  async listBooks(@Ctx() ctx: Context) {
    if (!ctx.accessToken) {
      throw new Error('unauthorized')
    }
    return listBooks(ctx.accessToken)
  }

  @Mutation(() => Book)
  async createBook(@Arg('book', { nullable: false }) book: BookInput, @Ctx() ctx: Context) {
    if (!ctx.accessToken) {
      throw new Error('unauthorized')
    }
    const author = authors.find((a) => a.id.toString() === book.authorId.toString())
    if (!author) {
      throw new Error('Author not found')
    }
    const books = await listBooks(ctx.accessToken)
    const newBook = {
      ...book,
      author,
      id: books.length + 1,
    }
    await createBook(newBook, ctx.accessToken)
    return newBook
  }

  @Mutation(() => Book)
  async updateBook(
    @Arg('id', () => ID, { nullable: false }) id: number,
    @Arg('book', { nullable: false }) book: BookInput,
    @Ctx() ctx: Context,
  ) {
    const author = authors.find((a) => a.id.toString() === book.authorId.toString())
    if (!author) {
      throw new Error('Author not found')
    }
    const newBook = { ...book, author, id }
    if (!ctx.accessToken) {
      throw new Error('unauthorized')
    }
    await updateBook(id, newBook, ctx.accessToken)
    return book
  }

  @Mutation(() => [Book])
  async deleteBook(@Arg('id', () => ID, { nullable: false }) id: number, @Ctx() ctx: Context) {
    if (!ctx.accessToken) {
      throw new Error('unauthorized')
    }
    await deleteBook(id, ctx.accessToken)
    return listBooks(ctx.accessToken)
  }
}
