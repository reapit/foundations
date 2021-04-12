import { formTwoStore } from '../core/store/form-store'

export const handleSubmitFormStepTwo = (date: string, time: string, handleNextStep: () => void) => {
  formTwoStore.update(() => {
    return {
      appointmentDate: {
        value: date,
        valid: true,
      },
      appointmentTime: {
        value: time,
        valid: true,
      },
    }
  })
  handleNextStep()
}
