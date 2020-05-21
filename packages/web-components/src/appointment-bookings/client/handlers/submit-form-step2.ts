import { form2Store as formStore } from '../core/store/form-store'

export const handleSubmitFormStep2 = (date: string, time: string, handleNextStep: () => void) => {
  formStore.update(() => {
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
