export const generateRandomId = (): string => {
  try {
    const isTest = process?.env?.NODE_ENV === 'test'
    return isTest ? 'test-static-id' : `random-${Math.random().toString(36).substring(7)}`
  } catch (e) {
    return ''
  }
}
