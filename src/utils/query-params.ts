export type Params = {
  [key: string]: any | any[]
}

export const queryParams = (params: Params) => {
  return Object.keys(params)
    .filter(
      key =>
        params[key] !== undefined && params[key] !== null && params[key] !== ''
    )
    .map(key => {
      if (Array.isArray(params[key])) {
        return params[key].map((value: any) => `${key}=${value}`).join('&')
      }
      return `${key}=${params[key]}`
    })
    .join('&')
}
