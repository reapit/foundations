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
  const index = books.findIndex((b) => b.id === id)
  if (index === -1) {
    throw new Error('Book not found')
  }
  books[index] = book
  await setBooks(books, accessToken)
}

export const deleteBook = async (id: number, accessToken: string) => {
  const books = await listBooks(accessToken)
  const index = books.findIndex((b) => b.id === id)
  if (index === -1) {
    throw new Error('Book not found')
  }
  books.splice(index, 1)
  await setBooks(books, accessToken)
}

listBooks('Bearer eyJraWQiOiJMaXpLc3V2SVJKTldOS1M5c3g2d0I5ZFAybGZHQUxzQWZ6OXVCSHlOZGxzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYTJlMzM1Yy0xZWM0LTQxNTEtYTBmOC05N2EwMWYzZTcyYjQiLCJjb2duaXRvOmdyb3VwcyI6WyJGb3VuZGF0aW9uc0RldmVsb3BlciJdLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0yLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMl9raWZ0UjRxRmMiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiJxZTJobDBmMWNtcjFhOWVvdHUxZHA0cm9yIiwib3JpZ2luX2p0aSI6IjQ4OTUxYmFhLWU2MDMtNDkxNy1hNjA5LTdjMDNkY2VlYWM2MCIsImV2ZW50X2lkIjoiOWY0Y2FiZDAtYWEzYS00MDI2LThiNDgtY2Q1NmQ5MWMxOWQwIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhZ2VuY3lDbG91ZFwvYXBwbGljYW50cy5yZWFkIHBob25lIG9wZW5pZCBwcm9maWxlIGVtYWlsIiwiYXV0aF90aW1lIjoxNjI5MTE4OTM0LCJleHAiOjE2Mjk3Mzc4MTQsImlhdCI6MTYyOTczNDIxNywianRpIjoiZTZkMTJmOGEtYmQ3Mi00NjM5LTk3ZTctZDMwM2MwZTM5YzVmIiwidXNlcm5hbWUiOiJmYTJlMzM1Yy0xZWM0LTQxNTEtYTBmOC05N2EwMWYzZTcyYjQifQ.VdxxLY9bCCCpzZemlgDNYZp8TKo--xhXAuEvuZ9ht1zLrCyP2fgjULlsQ5zLUEme42SVbbmohKdYLIpZAJb7TwHrteZ8wvHdqwy5ZINvTAxjmUZlldi5WUlm28DM0FDbM9sLQiImDUllds2sdpZNxUeDJ5NIIW_szb7RPuISn4bY9dVrggI3amN2V9dQ_6_S7Mqn08zkgJa0tFFe1eeZDWElP1vgs2bC7sCwNFi2_mTevqkgW5GlCb2eEi_9P3Qubyon9XuAPouNBVt-9pvhKFZe9UBL-kCo-xrXE7w8NfYh27ralwAYgynUHOwIa8Zvx2IHAYfpaqLGc4fNgGrCsQ')
  .then(console.log)