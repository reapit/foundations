export const isTextAndNumberOnly = (value: string): boolean => {
  if (!value) return false
  const re = /^[a-zA-Z0-9|\s]+$/
  return re.test(value)
}
