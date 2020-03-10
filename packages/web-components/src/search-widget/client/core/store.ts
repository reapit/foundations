import { writable, Writable } from 'svelte/store'
import { SearchWidgeInitializers } from './index'
import { PagedResultPropertyModel_, PropertyImageModel } from '@reapit/foundations-ts-definitions'

export interface SearchWidgetStore {
  initializers: SearchWidgeInitializers
  properties: PagedResultPropertyModel_ | null
  propertyImages: Record<string, PropertyImageModel> | null
}

const searchWidgetStore: Writable<SearchWidgetStore> = writable({
  initializers: {
    apiKey: '',
    theme: {},
  },
  properties: null,
  propertyImages: null,
})

export default searchWidgetStore
