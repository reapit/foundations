import { history } from '../core/router'

export const addQuery = (query: Record<string, any>): string => {
  const currentParams = new URLSearchParams(history.location.search)
  for (let key in query) {
    // eslint-disable-next-line no-prototype-builtins
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

export const stringifyObjectIntoQueryString = (params: object) => {
  return Object.keys(params)
    .map(key => key + '=' + params[key])
    .join('&')
}

export const getParamsFromPath = (search: string) => {
  const output = {} as Record<string, any>
  const params = new URLSearchParams(search)

  params.forEach((value, key) => {
    if (key === 'page') {
      const pageParam = Number(value)
      return (output.page = !isNaN(pageParam) && pageParam > 0 ? pageParam : 1)
    }
    output[key] = value || ''
  })

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
