export const setQueryParams = (params: Object) => {
  if (!Object.keys(params).length) return ''
  return Object.keys(params)
    .filter((key) => params[key] !== undefined && params[key] !== null && params[key] !== '')
    .map((key) => {
      if (Array.isArray(params[key])) {
        return params[key].map((value: any) => `${key}=${value}`).join('&')
      }
      return `${key}=${params[key]}`
    })
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
