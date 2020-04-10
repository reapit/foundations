import { FormDataStore } from '../core/store/form-store'
import { validateEmail } from '../utils/email-verify'

export const handleSubmitFormStep1 = (formStore: FormDataStore, handleNextStep: () => void) => () => {
  const result = validateFormStep1(formStore)
  console.log(result)
}

export const validateFormStep1 = (formStore: FormDataStore): { [key: string]: boolean } => {
  const email = validateEmail(formStore.email)
  // TODO PostCode validation
  const postCode = !!formStore.postCode
  const lookingFor = ['sell', 'let'].includes(formStore.lookingFor)
  return {
    email,
    postCode,
    lookingFor,
  }
}
