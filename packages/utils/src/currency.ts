export const currencySymbolMapper = (currency: string): string => {
  switch (currency) {
    case 'GBP':
      return '£'
    case 'EUR':
      return '€'
    case 'USD':
      return '$'
    case 'AUD':
      return 'A$'
    default:
      return currency
  }
}
