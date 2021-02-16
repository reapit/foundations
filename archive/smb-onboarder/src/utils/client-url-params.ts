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
