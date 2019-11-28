import { history } from '../core/router'
import { ClientParams } from '@/reducers/client'

export const addQuery = (query: ClientParams): string => {
  const currentParams = new URLSearchParams(history.location.search)
  for (let key in query) {
    if (query.hasOwnProperty(key)) {
      if (currentParams.has(key)) {
        currentParams.set(key, query[key])
      } else {
        currentParams.append(key, query[key])
      }
    }
  }
  const path = `${history.location.pathname}?${currentParams.toString()}`
  return path
}

export const removeQuery = (queries: Array<string>): string => {
  const currentParams = new URLSearchParams(history.location.search)
  queries.forEach(query => {
    if (currentParams.has(query)) {
      currentParams.delete(query)
    }
  })

  const path = `${history.location.pathname}?${currentParams.toString()}`
  return path
}

export const getParamsFromPath = (search: string): ClientParams => {
  const output = { page: 1, search: '', category: '' }
  const params = new URLSearchParams(search)
  if (params.has('page')) {
    const pageParam = Number(params.get('page'))
    output.page = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1
  }
  if (params.has('search')) {
    output.search = params.get('search') || ''
  }
  if (params.has('category')) {
    output.category = params.get('category') || ''
  }

  return output
}

export const getParamValueFromPath = (search: string, paramName: string): string => {
  const params = new URLSearchParams(search)
  if (params.has(paramName)) {
    return params.get(paramName) || ''
  }

  return ''
}

export const hasFilterParams = (search: string): boolean => {
  const params = new URLSearchParams(search)
  return params.has('search') || params.has('category')
}
