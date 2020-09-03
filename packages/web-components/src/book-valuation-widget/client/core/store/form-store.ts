import { writable } from 'svelte/store'

type FormDataStoreValue = {
  value: string
  valid: boolean
}

//Form 1 store
type FormOneDataStoreKey = 'lookingFor' | 'email' | 'postCode'
export type FormOneDataStore = Record<FormOneDataStoreKey, FormDataStoreValue>
export const formOneStore = writable<FormOneDataStore>({
  lookingFor: { value: 'sell', valid: true },
  email: { value: '', valid: true },
  postCode: { value: '', valid: true },
})

//Form 2 store
type FormTwoDataStoreKey = 'appointmentDate' | 'appointmentTime'
export type FormTwoDataStore = Record<FormTwoDataStoreKey, FormDataStoreValue>
export const formTwoStore = writable<FormTwoDataStore>({
  appointmentDate: { value: '', valid: true },
  appointmentTime: { value: '', valid: true },
})

//Form 3 store
type FormThreeDataStoreKey =
  | 'title'
  | 'firstName'
  | 'surname'
  | 'houseName'
  | 'houseNo'
  | 'address'
  | 'town'
  | 'country'
  | 'mobileNumber'
  | 'notes'
  | 'lookingToBuy'
  | 'marketingCommunication'

export type FormThreeDataStore = Record<FormThreeDataStoreKey, FormDataStoreValue>
export const formThreeStore = writable<FormThreeDataStore>({
  title: { value: '', valid: true },
  firstName: { value: '', valid: true },
  surname: { value: '', valid: true },
  houseName: { value: '', valid: true },
  houseNo: { value: '', valid: true },
  address: { value: '', valid: true },
  town: { value: '', valid: true },
  country: { value: '', valid: true },
  mobileNumber: { value: '', valid: true },
  notes: { value: '', valid: true },
  lookingToBuy: { value: 'no', valid: true },
  marketingCommunication: { value: '', valid: true },
})
