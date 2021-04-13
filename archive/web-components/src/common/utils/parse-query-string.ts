export const parseQueryString = (queryString: string = ''): { [key: string]: string } => {
  const objURL: { [key: string]: string } = {}
  const matcher = (_: string, p1: string, __: string, p3: string) => {
    objURL[p1] = p3
    return ''
  }
  queryString.replace(new RegExp('([^?=&]+)(=([^&]*))?', 'g'), matcher)

  return objURL
}
