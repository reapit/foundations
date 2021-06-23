import { validateBase } from '../validate-base'

describe('validate-base', () => {
  it('should return correct value when have input', () => {
    const input = {
      values: 'mockValue',
      keys: ['mockKey'],
      validator: jest.fn(),
      errMessage: 'mockError',
      currentErrors: { mockKey: 'mockCurrentError' },
    }
    const output = {
      mockKey: 'mockCurrentError',
    }
    const result = validateBase(input)
    expect(result).toEqual(output)
  })

  it('should return correct value when input keys []', () => {
    const input = {
      values: 'mockValue',
      keys: [],
      validator: jest.fn(),
      errMessage: 'mockError',
      currentErrors: {},
    }
    const output = {}
    const result = validateBase(input)
    expect(result).toEqual(output)
  })

  it('should return correct value when !currentErrors || !currentErrors[keyAsString]', () => {
    const input = {
      values: 'mockValue',
      keys: ['keys'],
      validator: jest.fn(),
      errMessage: 'mockError',
      currentErrors: {
        mockKey: 'mockCurrentError',
      },
    }
    const output = {
      keys: 'mockError',
      mockKey: 'mockCurrentError',
    }
    const result = validateBase(input)
    expect(result).toEqual(output)
  })
})
