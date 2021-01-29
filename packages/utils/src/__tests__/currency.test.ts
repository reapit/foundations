import { currencySymbolMapper } from '../currency'

describe('currencySymbolMapper', () => {
  const options = [
    { currency: 'USD', symbol: '$' },
    { currency: 'GBP', symbol: '£' },
    { currency: 'EUR', symbol: '€' },
    { currency: 'AUD', symbol: 'A$' },
    { currency: 'AED', symbol: 'AED' },
  ]

  options.forEach(option => {
    it(`should return the correct symbol for ${option.currency}`, () => {
      expect(currencySymbolMapper(option.currency)).toEqual(option.symbol)
    })
  })
})
