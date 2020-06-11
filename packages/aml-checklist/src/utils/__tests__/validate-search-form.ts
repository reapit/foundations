import { validate, SearchFormValues, MAX_LENGTH } from '../validate-search-form'

describe('validate', () => {
  it('should return correctly with 1 field filled in', () => {
    const values1: SearchFormValues = {
      name: 'John',
    }
    const result = validate(values1)
    expect(result).toEqual({})

    const values2: SearchFormValues = {
      address: 'John',
    }
    const result2 = validate(values2)
    expect(result2).toEqual({})

    const values3: SearchFormValues = {
      address: 'John',
    }
    const result3 = validate(values3)
    expect(result3).toEqual({})
  })

  it('should return correctly with no field filled in', () => {
    const values: SearchFormValues = {}
    const result = validate(values)
    expect(result).toEqual({
      name: 'Please enter a valid name',
      address: 'Please enter a valid address',
    })
  })

  it('should return correctly with value different than text and number', () => {
    const values: SearchFormValues = {
      name: '///',
      address: '///',
    }
    const result = validate(values)
    expect(result).toEqual({
      name: 'Please enter a valid name',
      address: 'Please enter a valid address',
    })
  })

  it('should return correctly with long values', () => {
    const values: SearchFormValues = {
      name:
        // eslint-disable-next-line max-len
        'jskmgjduhpacixvurqlkxcmfngrmhouxzpnnezvbtasddguyzydwmlgkhocqrkgwyhzterowmceehsiqtgjnfgyluvskudogfxspumymirorgfrpnkdooodwbefrqqqnxyyjdwoqvtnibkaujmflfsezsjxvkdemroippmkpwnayqlmldkfiodilttyfmiuhxpbztkdthnpknbonbrwzpathqzbxmfeqjkzglrezqrqeixbfvaepppfczarqukdpy',
      address: 'addresss1',
    }
    const result = validate(values)
    expect(result).toEqual({
      name: `name must be less than ${MAX_LENGTH.name} characters`,
    })
  })
})
