import { handleSubmitFormStepThree, validateFormStepThree } from '../submit-form-step-three'
import { get } from 'svelte/store'

const mockFormValues = {
  title: { value: 'Mr', valid: true },
  firstName: { value: 'John', valid: true },
  surname: { value: 'Smith', valid: true },
  houseName: { value: 'House name', valid: true },
  houseNo: { value: '123', valid: true },
  address: { value: 'Notting Hill', valid: true },
  town: { value: 'Ballad', valid: true },
  country: { value: 'Los Santos', valid: true },
  mobileNumber: { value: '9121723123', valid: true },
  notes: { value: 'Notes', valid: true },
  lookingToBuy: { value: 'no', valid: true },
  marketingCommunication: { value: '', valid: true },
}

const mockFormValidationResult = {
  firstName: true,
  surname: true,
  address: true,
  mobileNumber: true,
}

jest.mock('svelte/store', () => ({
  ...jest.requireActual('svelte/store'),
  get: jest.fn(() => mockFormValues),
}))

describe('validateFormStepThree', () => {
  it('should return correct value', () => {
    const result = validateFormStepThree(mockFormValues)
    expect(result).toEqual(mockFormValidationResult)
  })

  it('should return correctly when first name is empty', () => {
    const result = validateFormStepThree({
      ...mockFormValues,
      firstName: { value: '', valid: true },
    })
    expect(result).toEqual({
      ...mockFormValidationResult,
      firstName: false,
    })
  })
  it('should return correctly when surname is empty', () => {
    const result = validateFormStepThree({
      ...mockFormValues,
      surname: { value: '', valid: true },
    })
    expect(result).toEqual({
      ...mockFormValidationResult,
      surname: false,
    })
  })
  it('should return correctly when address is empty', () => {
    const result = validateFormStepThree({
      ...mockFormValues,
      address: { value: '', valid: true },
    })
    expect(result).toEqual({
      ...mockFormValidationResult,
      address: false,
    })
  })
  it('should return correctly when mobile number is invalid', () => {
    const result = validateFormStepThree({
      ...mockFormValues,
      mobileNumber: { value: '90123a', valid: true },
    })
    expect(result).toEqual({
      ...mockFormValidationResult,
      mobileNumber: false,
    })
  })
})

describe('handleSubmitFormStepThree', () => {
  it('should run correctly', () => {
    const handleFormSubmitCallback = jest.fn()
    const fn = handleSubmitFormStepThree(handleFormSubmitCallback)
    fn()
    expect(handleFormSubmitCallback).toHaveBeenCalled()
  })

  it('should not call handleNextStep when one field is invalid', () => {
    ;(get as jest.Mocked<any>).mockImplementation(() => ({
      ...mockFormValues,
      mobileNumber: { value: '91273a1238911', valid: true },
    }))
    const handleFormSubmitCallback = jest.fn()
    const fn = handleSubmitFormStepThree(handleFormSubmitCallback)
    fn()
    expect(handleFormSubmitCallback).not.toHaveBeenCalled()
  })
})
