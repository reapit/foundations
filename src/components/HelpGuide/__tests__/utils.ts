import { generateNumbers } from '../utils'

describe('help guide utils', () => {
  it('generateNumbers', () => {
    const total = 5
    const expectResult = [0, 1, 2, 3, 4]

    expect(generateNumbers(total)()).toEqual(expectResult)
  })
})
