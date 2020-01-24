import { capitalizeFirstLetter } from '../capitalizeFirstLetter'

describe('capitalizeFirstLetter', () => {
  it('runs correctly', () => {
    expect(capitalizeFirstLetter('abc')).toBe('Abc')
    expect(capitalizeFirstLetter('')).toBe('')
  })
})
