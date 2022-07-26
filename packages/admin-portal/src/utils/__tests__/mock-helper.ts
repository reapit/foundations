import { getMockRouterProps } from '../mock-helper'

describe('getMockRouterProps', () => {
  it('works as expected', () => {
    const inputs = [null]

    inputs.forEach((input) => {
      const result = getMockRouterProps(input)
      expect(result).toBeDefined()
    })
  })
})
