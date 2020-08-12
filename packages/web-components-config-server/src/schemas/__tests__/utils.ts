import { generateSchemaItem } from '../utils'
import { WebComponentConfig } from '../schema'

describe('generateSchemaItem', () => {
  it('should return instance of WebComponentConfig', () => {
    const result = generateSchemaItem({ customerId: 'DXX' })

    expect(result).toBeInstanceOf(WebComponentConfig)
  })
})
