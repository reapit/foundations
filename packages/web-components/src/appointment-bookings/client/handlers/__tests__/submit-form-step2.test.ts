import { handleSubmitFormStep2 } from '../submit-form-step2'

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
    handleSubmitFormStep2(handleNextStep, mockFormValues.appointmentDate.value, mockFormValues.appointmentTime.value)
    expect(handleNextStep).toHaveBeenCalled()
  })
})
