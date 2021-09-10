export const generateRandomId = (): string => {
  try {
    return `random-${Math.random().toString(36).substring(7)}`
  } catch (e) {
    return ''
  }
}
