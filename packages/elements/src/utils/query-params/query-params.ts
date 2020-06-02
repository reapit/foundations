import { isEmptyObject } from '../validators/validate-object'

export const setQueryParams = (params: Object) => {
  if (isEmptyObject(params)) return ''
  return Object.keys(params)
    .filter(key => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .map(key => {
      if (Array.isArray(params[key])) {
        return params[key].map((value: any) => `${key}=${value}`).join('&')
      }
      return `${key}=${params[key]}`
    })
    .join('&')
}
