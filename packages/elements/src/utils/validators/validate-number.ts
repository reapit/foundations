export const isNumberOnly = string => {
  const re = /^\d+$/
  return re.test(string)
}
