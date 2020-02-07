import { capitalizeFirstLetter } from '../capitalize-first-letter'

describe('capitalizeFirstLetter', () => {
  it('runs correctly', () => {
    expect(capitalizeFirstLetter('abc')).toBe('Abc')
    expect(capitalizeFirstLetter('')).toBe('')
  })
})
