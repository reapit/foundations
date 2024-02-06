const titles: string[] = [
  'Mr',
  'Mrs',
  'Dr',
  'Doctor',
  'Master',
  'Miss',
  'Ms',
  'Sir',
  'Mdm',
  'Madam',
  'Dame',
  'Lord',
  'Lady',
  'Esq',
  'Prof',
  'Professor',
]

export const tryGetFirstName = (input: string = '') => {
  const trimmed = input.trim()

  if (trimmed.length < 2) {
    return input
  }

  const nameParts: string[] = trimmed.split(' ')

  if (nameParts.length < 3) {
    return nameParts[0]
  }

  return titles.includes(nameParts[0]) ? nameParts[1] : nameParts[0]
}
