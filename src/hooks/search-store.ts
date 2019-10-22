import { PagedResultPropertyModel_, PropertyModel } from '../types/property'
import { useState } from 'react'

import { PropertyImageModel } from '../types/propertyImage'

export type SearchType = 'Sale' | 'Rent' | undefined

export interface SearchStore {
  err: Error | null,
  isLoading: Boolean | null,
  searchKeyWord: string,
  searchType: SearchType | undefined,
  propertyImages: Record<string, PropertyImageModel>,
  result: PagedResultPropertyModel_ | null | undefined,
  selectedProperty: PropertyModel | undefined,

  setStartFetching: () => void,
  setFetchResult: (result: PagedResultPropertyModel_, propertyImages: Record<string, PropertyImageModel>, searchKeyWord: string, searchType: SearchType) => void,
  setFetchError: (err: Error) => void,
  setSearchKeyWord: (keyWord: string) => void,
  setSelectedProperty: any,
  setPropertyImages: (propertyImages: Record<string, PropertyImageModel>) => void,
  getErrorString: () => string | null | undefined,
  getCountResult: () => number | null | undefined,
  getResultArr: () => PropertyModel[],
}


export function useSearchStore(): SearchStore {
  const [result, _setResult] = useState<PagedResultPropertyModel_ | null>()
  const [err, _setErr] = useState<Error | null>(null)
  const [isLoading, _setIsLoading] = useState<Boolean | null>(false)
  const [searchKeyWord, setSearchKeyWord] = useState<string>('')
  const [searchType, setSearchType] = useState<SearchType>()
  const [propertyImages, setPropertyImages] = useState<Record<string, PropertyImageModel>>({})
  const [selectedProperty, setSelectedProperty] = useState<PropertyModel>()

  const setFetchResult = (result: PagedResultPropertyModel_, propertyImages: Record<string, PropertyImageModel>, searchKeyWord: string, searchType: SearchType) => {
    _setResult(result)
    _setIsLoading(false)
    setPropertyImages(propertyImages)
    setSearchKeyWord(searchKeyWord)
    setSearchType(searchType)
  }

  const setFetchError = (err: Error) => {
    _setErr(err)
    _setIsLoading(false)
  }

  const setStartFetching = () => {
    _setIsLoading(true)
    _setErr(null)
  }


  const getErrorString = () => {
    if (!err) {
      return null
    }

    return err.message
  }

  const getCountResult = () => {
    if (!result) {
      return result
    }

    return result.pageCount
  }

  const getResultArr = () => {
    if (!result || !result.data) {
      return []
    }


    return result.data
  }

  return {
    selectedProperty,
    setSelectedProperty,
    propertyImages,
    err,
    result,
    isLoading,
    getCountResult,
    getErrorString,
    getResultArr,
    searchKeyWord,
    setFetchError,
    setFetchResult,
    setStartFetching,
    setSearchKeyWord,
    searchType,
    setPropertyImages,
  }
}
