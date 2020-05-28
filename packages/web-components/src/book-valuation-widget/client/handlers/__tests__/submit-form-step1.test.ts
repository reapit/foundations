import { handleSubmitFormStep1, validateFormStep1 } from '../submit-form-step1'
import { get } from 'svelte/store'

jest.mock('svelte/store', () => ({
  ...jest.requireActual('svelte/store'),
  get: jest.fn(() => ({
    email: { valid: true, value: 'test@gmail.com' },
    lookingFor: { valid: true, value: 'sell' },
    postCode: { valid: true, value: 'NN1 1DF' },
  })),
}))

describe('validateFormStep1', () => {
  it('should return correct value', () => {
    const result = validateFormStep1({
      email: { valid: true, value: 'test@gmail.com' },
      lookingFor: { valid: true, value: 'sell' },
      postCode: { valid: true, value: 'NN1 1DF' },
    })
    expect(result).toEqual({
      email: true,
      lookingFor: true,
      postCode: true,
    })
  })

  it('should return correctly when invalid email', () => {
    const result = validateFormStep1({
      email: { valid: true, value: 'testgmail.com' },
      lookingFor: { valid: true, value: 'sell' },
      postCode: { valid: true, value: 'NN1 1DF' },
    })
    expect(result).toEqual({
      email: false,
      lookingFor: true,
      postCode: true,
    })
  })
})

describe('handleSubmitFormStep1', () => {
  it('should run correctly', () => {
    const handleNextStep = jest.fn()
    const fn = handleSubmitFormStep1(handleNextStep)
    fn()
    expect(handleNextStep).toHaveBeenCalled()
  })

  it('should not call handleNextStep when one field is invalid', () => {
    ;(get as jest.Mocked<any>).mockImplementation(() => ({
      email: { valid: false, value: 'testgmail.com' },
      lookingFor: { valid: true, value: 'sell' },
      postCode: { valid: true, value: 'NN1 1DF' },
    }))
    const handleNextStep = jest.fn()
    const fn = handleSubmitFormStep1(handleNextStep)
    fn()
    expect(handleNextStep).not.toHaveBeenCalled()
  })
})
