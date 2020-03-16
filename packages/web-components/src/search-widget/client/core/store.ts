import { writable, Writable } from 'svelte/store'
import { SearchWidgeInitializers } from './index'
import { PagedResultPropertyModel_, PropertyImageModel } from '@reapit/foundations-ts-definitions'

export type SearchType = 'Sale' | 'Rent' | undefined

export interface SearchWidgetStore {
  initializers: SearchWidgeInitializers
  properties: PagedResultPropertyModel_ | null
  propertyImages: Record<string, PropertyImageModel> | null
  searchType?: SearchType
  searchKeyword?: string
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

export const mapLoaded = writable<boolean>(false)
export const mapLoading = writable<boolean>(false)
export const markers = writable<google.maps.Marker[]>([])
