export const isImageType = (type: string) => {
  const regex = /^image\//
  return regex.test(type)
}
