export const isNumberOnly = string => {
  // RFC 5322 email specfication
  // eslint-disable-next-line no-useless-escape
  let re = /^\d+$/
  return re.test(string)
}
