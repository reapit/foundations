export interface StringMap {
  [key: string]: string
}

export interface FetcherParams<T> {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  api: string
  url: string
  headers: StringMap
  body?: T
}

export type FormFieldInfo = {
  name: string
  label?: string
  heading?: string
  subHeading?: string
  placeHolder?: string
  errorMessage?: string
}
