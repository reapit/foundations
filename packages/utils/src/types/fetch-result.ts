export type FetchDetailResult<T> = {
  isLoading: boolean
  data: T | null
  errorMessage: string
}

export type FetchListResult<T> = T & Pick<FetchDetailResult<any>, 'isLoading' | 'errorMessage'>
