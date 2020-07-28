export type FetchDetailResult<T> = {
  isLoading: boolean
  data: T | null
  errorMessage: string
}
