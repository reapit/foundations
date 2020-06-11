import { validate, SearchFormValues } from '../validate-search-form'

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
    const value1: SearchFormValues = {}
    const result1 = validate(value1)
    expect(result1).toEqual({
      name: 'Please enter a valid name',
      address: 'Please enter a valid address',
    })
  })
})
