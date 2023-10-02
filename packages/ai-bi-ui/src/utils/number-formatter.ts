export const formatCurrency = (
  amount: number,
  minimumFractionDigits = 2,
  locales: string = 'en-GB',
  currency = 'GBP',
) => {
  const numberFormat = new Intl.NumberFormat(locales, {
    style: 'currency',
    currency,
    minimumFractionDigits,
  })
  return numberFormat.format(amount)
}

export const formatNumber = (amount: number, minimumFractionDigits = 0, locales: string = 'en-GB') => {
  const numberFormat = new Intl.NumberFormat(locales, {
    minimumFractionDigits,
  })
  return numberFormat.format(amount)
}
