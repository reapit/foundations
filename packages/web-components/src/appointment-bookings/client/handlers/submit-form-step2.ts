import { form2Store as formStore } from '../core/store/form-store'

export const handleSubmitFormStep2 = (handleNextStep: () => void, date: string, time: string) => {
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
