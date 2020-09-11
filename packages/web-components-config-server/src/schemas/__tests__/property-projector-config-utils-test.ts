import { generateSchemaItem } from '../property-projector-config/utils'
import { PropertyProjectorConfig } from '../property-projector-config/schema'

describe('generateSchemaItem', () => {
  it('should return instance of PropertyProjectorConfig', () => {
    const result = generateSchemaItem({ customerId: 'DXX' })

    expect(result).toBeInstanceOf(PropertyProjectorConfig)
  })
})
