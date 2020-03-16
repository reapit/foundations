import { writable, Writable } from 'svelte/store'
import { SearchWidgeInitializers } from './index'
import { PagedResultPropertyModel_, PropertyImageModel, PropertyModel } from '@reapit/foundations-ts-definitions'

export type SearchType = 'Sale' | 'Rent' | undefined

export interface SearchWidgetStore {
  initializers: SearchWidgeInitializers
  properties: PagedResultPropertyModel_ | null
  propertyImages: Record<string, PropertyImageModel> | null
  selectedProperty: PropertyModel | null
  searchType?: SearchType
  searchKeyword?: string
  markers: google.maps.Marker[]
  mapLoading: boolean
}

const searchWidgetStore: Writable<SearchWidgetStore> = writable({
  initializers: {
    apiKey: '',
    theme: {},
  },
  properties: null,
  propertyImages: null,
  selectedProperty: null,
  markers: [],
  mapLoading: false,
})

export default searchWidgetStore
