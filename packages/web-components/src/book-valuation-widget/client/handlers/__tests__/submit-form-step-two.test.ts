import { handleSubmitFormStepTwo } from '../submit-form-step-two'

const mockFormValues = {
  appointmentDate: { valid: true, value: 'Thursday, 16 April' },
  appointmentTime: { valid: true, value: '11:11' },
}

jest.mock('svelte/store', () => ({
  ...jest.requireActual('svelte/store'),
  get: jest.fn(() => mockFormValues),
}))

describe('handleSubmitFormStep2', () => {
  it('should run correctly', () => {
    const handleNextStep = jest.fn()
    handleSubmitFormStepTwo(mockFormValues.appointmentDate.value, mockFormValues.appointmentTime.value, handleNextStep)
    expect(handleNextStep).toHaveBeenCalled()
  })
})
