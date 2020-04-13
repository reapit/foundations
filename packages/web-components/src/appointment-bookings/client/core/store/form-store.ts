import { writable } from 'svelte/store'

type FormDataStoreValue = {
  value: string
  valid: boolean
}

type FormDataStoreKey = 'lookingFor' | 'email' | 'postCode'

export type FormDataStore = Record<FormDataStoreKey, FormDataStoreValue>

export const formStore = writable<FormDataStore>({
  lookingFor: { value: 'sell', valid: true },
  email: { value: '', valid: true },
  postCode: { value: 'NN1 1DF', valid: true },
})
