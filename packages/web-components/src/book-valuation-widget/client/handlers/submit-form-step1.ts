import { get } from 'svelte/store'
import { Form1DataStore as FormDataStore, form1Store as formStore } from '../core/store/form-store'
import { validateEmail } from '../utils/validator'

export const handleSubmitFormStep1 = (handleNextStep: () => void) => () => {
  const formDataStore: FormDataStore = get(formStore)
  const validObj = validateFormStep1(formDataStore)
  formStore.update((prev: FormDataStore) => {
    const { lookingFor: prevLookingFor, email: prevEmail, postCode: prevPostCode } = prev
    return {
      lookingFor: { ...prevLookingFor, valid: validObj.lookingFor },
      email: { ...prevEmail, valid: validObj.email },
      postCode: { ...prevPostCode, valid: validObj.postCode },
    }
  })
  if (Object.values(validObj).every(fieldIsValid => fieldIsValid) && typeof handleNextStep === 'function') {
    handleNextStep()
  }
}

export const validateFormStep1 = (
  formDataStore: FormDataStore,
): { email: boolean; postCode: boolean; lookingFor: boolean } => {
  const email = validateEmail(formDataStore.email.value)
  // TODO PostCode valid format validation
  const postCode = !!formDataStore.postCode.value
  const lookingFor = ['sell', 'let'].includes(formDataStore.lookingFor.value)
  return {
    email,
    postCode,
    lookingFor,
  }
}
