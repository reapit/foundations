import Routes from '../constants/routes'

export interface StringMap {
  [key: string]: string
}

export type PartialRecord<K extends keyof any, T> = { [P in K]?: T }

export type RouteValue = keyof typeof Routes

export type FormState = 'PENDING' | 'DONE' | 'SUBMITTING' | 'ERROR' | 'SUCCESS'

export interface FetcherParams<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  api: string
  url: string
  headers: StringMap
  isPrivate?: boolean
  body?: T
}

export interface PagedApiResponse<T> {
  _embedded: T[]
  pageNumber: number
  pageSize: number
  pageCount: number
  totalPageCount: number
  totalCount: number
  _links?: Links
}

interface Links {
  self?: Self
  first?: Self
  next?: Self
  last?: Self
}

interface Self {
  href: string
}
