export const queryParams = (params: Object) => {
  return Object.keys(params)
    .filter(key => params[key] && params[key].length)
    .map(key => {
      if (Array.isArray(params[key])) {
        return params[key].map((value: any) => `${key}=${value}`).join('&')
      }
      return `${key}=${params[key]}`
    })
    .join('&')
}
