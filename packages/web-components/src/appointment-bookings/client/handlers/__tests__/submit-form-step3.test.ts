import { handleSubmitFormStep3, validateFormStep3 } from '../submit-form-step3'
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

describe('validateFormStep3', () => {
  it('should return correct value', () => {
    const result = validateFormStep3(mockFormValues)
    expect(result).toEqual(mockFormValidationResult)
  })

  it('should return correctly when first name is empty', () => {
    const result = validateFormStep3({
      ...mockFormValues,
      firstName: { value: '', valid: true },
    })
    expect(result).toEqual({
      ...mockFormValidationResult,
      firstName: false,
    })
  })
  it('should return correctly when surname is empty', () => {
    const result = validateFormStep3({
      ...mockFormValues,
      surname: { value: '', valid: true },
    })
    expect(result).toEqual({
      ...mockFormValidationResult,
      surname: false,
    })
  })
  it('should return correctly when address is empty', () => {
    const result = validateFormStep3({
      ...mockFormValues,
      address: { value: '', valid: true },
    })
    expect(result).toEqual({
      ...mockFormValidationResult,
      address: false,
    })
  })
  it('should return correctly when mobile number is invalid', () => {
    const result = validateFormStep3({
      ...mockFormValues,
      mobileNumber: { value: '90123a', valid: true },
    })
    expect(result).toEqual({
      ...mockFormValidationResult,
      mobileNumber: false,
    })
  })
})

describe('handleSubmitFormStep3', () => {
  it('should run correctly', () => {
    const handleFormSubmitCallback = jest.fn()
    const fn = handleSubmitFormStep3(handleFormSubmitCallback)
    fn()
    expect(handleFormSubmitCallback).toHaveBeenCalled()
  })

  it('should not call handleNextStep when one field is invalid', () => {
    ;(get as jest.Mocked<any>).mockImplementation(() => ({
      ...mockFormValues,
      mobileNumber: { value: '91273a1238911', valid: true },
    }))
    const handleFormSubmitCallback = jest.fn()
    const fn = handleSubmitFormStep3(handleFormSubmitCallback)
    fn()
    expect(handleFormSubmitCallback).not.toHaveBeenCalled()
  })
})
