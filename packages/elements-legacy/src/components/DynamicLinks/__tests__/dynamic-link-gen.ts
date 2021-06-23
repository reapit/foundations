import { genLaunchEntityLink, EntityType, DynamicLinkParams } from '../dynamic-link-gen'

describe('dynamic-link-gen.ts', () => {
  describe('genLaunchEntityLink', () => {
    it('genLaunchEntityLink return value', () => {
      const input = { entityCode: '123' } as DynamicLinkParams
      const result = genLaunchEntityLink(input, EntityType.COMPANY)
      const output = 'companies/123'
      expect(result).toEqual(output)
    })

    it('genLaunchEntityLink return null', () => {
      const input = { entityCode: '123' } as DynamicLinkParams
      const result = genLaunchEntityLink(input)
      const output = null
      expect(result).toEqual(output)
    })
  })
})
