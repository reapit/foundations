import { writable } from 'svelte/store'

type FormDataStoreValue = {
  value: string
  // null means untouched, false means validate error , true means no error
  valid: boolean
}

type FormDataStoreKey = 'lookingFor' | 'email' | 'postCode'

export type FormDataStore = Record<FormDataStoreKey, FormDataStoreValue>

export const formStore = writable<FormDataStore>({
  lookingFor: { value: 'sell', valid: true },
  email: { value: '', valid: true },
  postCode: { value: 'NN1 1DF', valid: true },
})
