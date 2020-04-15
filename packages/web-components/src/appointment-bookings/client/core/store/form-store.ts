import { writable } from 'svelte/store'

type FormDataStoreValue = {
  value: string
  valid: boolean
}

//Form 1 store
type Form1DataStoreKey = 'lookingFor' | 'email' | 'postCode'
export type Form1DataStore = Record<Form1DataStoreKey, FormDataStoreValue>
export const form1Store = writable<Form1DataStore>({
  lookingFor: { value: 'sell', valid: true },
  email: { value: '', valid: true },
  postCode: { value: 'NN1 1DF', valid: true },
})

//Form 2 store
type Form2DataStoreKey = 'appointmentDate' | 'appointmentTime'
export type Form2DataStore = Record<Form2DataStoreKey, FormDataStoreValue>
export const form2Store = writable<Form2DataStore>({
  appointmentDate: { value: '', valid: true },
  appointmentTime: { value: '', valid: true },
})

//Form 3 store
type Form3DataStoreKey =
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

export type Form3DataStore = Record<Form3DataStoreKey, FormDataStoreValue>
export const form3Store = writable<Form3DataStore>({
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
