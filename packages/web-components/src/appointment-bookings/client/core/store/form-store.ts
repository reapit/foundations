import { writable } from 'svelte/store'

export interface FormDataStore {
  lookingFor: 'sell' | 'let'
  email: string
  postCode: string
}
export const formStore = writable<FormDataStore>({
  lookingFor: 'sell',
  email: '',
  postCode: 'NN1 1DF',
})
