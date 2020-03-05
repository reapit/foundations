import { writable, Writable } from 'svelte/store'
import { SearchWidgeInitializers } from './index'

export const initializers: Writable<SearchWidgeInitializers> = writable({
  apiKey: '',
  theme: {},
})

export const simpleStore: Writable<number> = writable(0)
