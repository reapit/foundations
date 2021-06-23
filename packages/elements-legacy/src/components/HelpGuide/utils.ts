export const generateNumbers = (total: number) => () => {
  const result: number[] = []
  for (let i = 0; i < total; i++) {
    result.push(i)
  }
  return result
}
