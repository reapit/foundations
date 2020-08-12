export const getAddress = (property: any): string => {
  const address: string[] = []

  if (property.address === null) return ''

  if (property.address.line1 !== null) address.push(property.address.line1)
  if (property.address.line2 !== null) address.push(property.address.line2)
  if (property.address.postcode !== null) address.push(property.address.postcode)

  return address.join(', ')
}

export const getPriceString = (property: any): string => {
  if (property.selling === null) return ''
  return formatMoney(property.selling.price)
}

export const getRentString = (property: any): string => {
  if (property.letting === null) return ''
  return `${formatMoney(property.letting.rent)} ${getRentFrequency(property.letting.rentFrequency)}`
}

export const getSaleStatus = (property: any): string => {
  if (property.selling === null) return ''
  return property.selling.status
}

export const getLettingStatus = (property: any): string => {
  if (property.letting === null) return ''
  return property.letting.status
}

const getRentFrequency = (frequency: string): string => {
  switch (frequency) {
    case 'weekly':
      return 'per week'
    case 'monthly':
      return 'per month'
    case 'annually':
      return 'per year'
    default:
      return ''
  }
}

const formatMoney = (number: number): string => {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(number)
}
