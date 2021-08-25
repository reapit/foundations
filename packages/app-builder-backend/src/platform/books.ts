import { Genre } from '../entities/genre'
import { authors } from '../resolvers/author-resolver'
import { getDataEntity, setDataEntity } from '.'
import { Book } from '../entities/book'

const dataEntityName = 'books'

const defaultBooks: Array<Book> = [
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

export const listBooks = async (accessToken: string): Promise<Array<Book>> => {
  const { data } = await getDataEntity(dataEntityName, accessToken)
  if (data.length === 0) {
    return setBooks(defaultBooks, accessToken)
  }
  return data as Array<Book>
}

export const setBooks = async (books: Array<Book>, accessToken: string) => {
  return setDataEntity(dataEntityName, books, accessToken)
}

export const createBook = async (book: Book, accessToken: string) => {
  const books = await listBooks(accessToken)
  books.push(book)
  await setBooks(books, accessToken)
  return book
}

export const updateBook = async (id: number, book: Book, accessToken: string) => {
  const books = await listBooks(accessToken)
  const index = books.findIndex((b) => b.id.toString() === id.toString())
  if (index === -1) {
    throw new Error('Book not found')
  }
  books[index] = book
  await setBooks(books, accessToken)
}

export const getBook = async (id: number, accessToken: string): Promise<Book | undefined> => {
  const books = await listBooks(accessToken)
  return books.find((b) => b.id.toString() === id.toString())
}

export const deleteBook = async (id: number, accessToken: string) => {
  const books = await listBooks(accessToken)
  const index = books.findIndex((b) => b.id.toString() === id.toString())
  if (index === -1) {
    throw new Error('Book not found')
  }
  books.splice(index, 1)
  await setBooks(books, accessToken)
}
