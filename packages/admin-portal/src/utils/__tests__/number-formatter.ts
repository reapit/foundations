import { formatCurrency, formatNumber } from '../number-formatter'
describe('formatCurrency', () => {
  it('should run correctly', () => {
    expect(formatCurrency(14.489)).toEqual('£14.49')
  })
  it('should run correctly', () => {
    expect(formatCurrency(143.025, 2, 'en-US', 'USD')).toEqual('$143.03')
  })
})
describe('formatNumber', () => {
  it('should run correctly', () => {
    expect(formatNumber(14000)).toEqual('14,000')
  })
})
