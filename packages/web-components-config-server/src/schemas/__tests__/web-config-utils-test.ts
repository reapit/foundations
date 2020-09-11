import { generateSchemaItem } from '../web-components-config/utils'
import { WebComponentConfig } from '../web-components-config/schema'

describe('generateSchemaItem', () => {
  it('should return instance of WebComponentConfig', () => {
    const result = generateSchemaItem({ customerId: 'DXX' })

    expect(result).toBeInstanceOf(WebComponentConfig)
  })
})
