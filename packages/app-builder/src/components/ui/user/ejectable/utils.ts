export const uppercaseSentence = (str: string) => {
  const res = str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
  return res
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split('  ')
    .join(' ')
}
