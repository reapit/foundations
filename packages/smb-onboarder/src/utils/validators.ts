export const isNumber = (value: string) => {
  const regex = /^[0-9 ]+$/
  return regex.test(value)
}
