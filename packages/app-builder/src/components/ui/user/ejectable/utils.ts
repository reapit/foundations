export const uppercaseSentence = (str: string) => {
  const res = str.replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
  return res
    .replace(/([A-Z])/g, ' $1')
    .trim()
    .split('  ')
    .join(' ')
}

export const camelCaseToSentence = (camelCase: string) => {
  if (camelCase.length === 2) {
    return camelCase
  }
  return uppercaseSentence(camelCase.replace(/([A-Z])/g, ' $1'))
}

export const friendlyIdName = (idName: string) => {
  const words = idName.replaceAll('Id', '').split('_')
  return words
    .map((w) => w.split('.'))
    .flat()
    .map(camelCaseToSentence)
    .join(' ')
}
