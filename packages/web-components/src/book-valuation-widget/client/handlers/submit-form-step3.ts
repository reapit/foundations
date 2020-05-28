import { get } from 'svelte/store'
import { Form3DataStore as FormDataStore, form3Store as formStore } from '../core/store/form-store'
import { validateRequiredField, validatePhoneNumber } from '../utils/validator'

export const handleSubmitFormStep3 = (handleFormSubmitCallback: (formDataStore: FormDataStore) => void) => {
  return () => {
    const formDataStore: FormDataStore = get(formStore)
    const validObj = validateFormStep3(formDataStore)
    formStore.update((prev: FormDataStore) => {
      const { firstName, surname, address, mobileNumber, ...rest } = prev
      return {
        firstName: { ...firstName, valid: validObj.firstName },
        surname: { ...surname, valid: validObj.surname },
        address: { ...address, valid: validObj.address },
        mobileNumber: { ...mobileNumber, valid: validObj.mobileNumber },
        ...rest,
      }
    })
    if (Object.values(validObj).every(fieldIsValid => fieldIsValid) && typeof handleFormSubmitCallback === 'function') {
      handleFormSubmitCallback(formDataStore)
    }
  }
}

export const validateFormStep3 = (
  formDataStore: FormDataStore,
): { firstName: boolean; surname: boolean; address: boolean; mobileNumber: boolean } => {
  const firstName = validateRequiredField(formDataStore.firstName.value)
  const surname = validateRequiredField(formDataStore.surname.value)
  const address = validateRequiredField(formDataStore.address.value)
  const mobileNumber = validatePhoneNumber(formDataStore.mobileNumber.value)
  return {
    firstName,
    surname,
    address,
    mobileNumber,
  }
}
