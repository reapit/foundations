const base64Regex = new RegExp('^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$')

export const isBase64 = (base64Str: string | undefined | null) => {
  const base64Value = (base64Str && base64Str.split(';base64,')[1]) || ''
  return base64Regex.test(base64Value)
}
