export const getTypeFromBase64 = (base64: string): string => {
  try {
    const type = base64.split(';')[0].split(':')[1]
    return type
  } catch (error) {
    return ''
  }
}
