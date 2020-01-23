import { getMockRouterProps } from '../mock-helper'

describe('getMockRouterProps', () => {
  it('works as expected', () => {
    const inputs = [null]

    for (let i = 0; i < inputs.length; i++) {
      const result = getMockRouterProps(inputs[i])
      expect(result).toBeDefined()
    }
  })
})
