/*
 * TODOME(fetchResult)
 * import
 */
import { FetchDetailResult } from './types/fetch-result'

export const getDefaultFetchListValue = () => ({
  ...getDefaultFetchDetailValue(),
  data: [],
  totalCount: 0,
  pageSize: 0,
  pageNumber: 0,
  pageCount: 0,
})

export const getDefaultFetchDetailValue: <T>() => FetchDetailResult<T> = () => ({
  isLoading: false,
  errorMessage: '',
  data: null,
})
