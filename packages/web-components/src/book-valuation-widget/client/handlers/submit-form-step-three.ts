import { get } from 'svelte/store'
import { FormThreeDataStore, formThreeStore } from '../core/store/form-store'
import { validateRequiredField, validatePhoneNumber } from '../utils/validator'

export const handleSubmitFormStepThree = (handleFormSubmitCallback: (formDataStore: FormThreeDataStore) => void) => {
  return () => {
    const formDataStore: FormThreeDataStore = get(formThreeStore)
    const validObj = validateFormStepThree(formDataStore)
    formThreeStore.update((prev: FormThreeDataStore) => {
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

export const validateFormStepThree = (
  formDataStore: FormThreeDataStore,
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
