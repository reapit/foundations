import { writable, Writable } from 'svelte/store'
import { SearchWidgeInitializers } from './index'
import { PagedResultPropertyModel_, PropertyImageModel, PropertyModel } from '@reapit/foundations-ts-definitions'

export interface SearchWidgetStore {
  initializers: SearchWidgeInitializers
  properties: PagedResultPropertyModel_ | null
  propertyImages: Record<string, PropertyImageModel> | null
  selectedProperty: PropertyModel | null
  selectedMarker: google.maps.Marker | null
  searchType: 'Sale' | 'Rent'
  searchKeyword: string
}

const searchWidgetStore: Writable<SearchWidgetStore> = writable({
  initializers: {
    apiKey: '',
    theme: {
      globalStyles: '',
      primaryHeading: '',
      secondaryHeading: '',
      primaryStrapline: '',
      secondaryStrapline: '',
      selectedItem: '',
      bodyText: '',
      button: '',
      input: '',
    },
  },
  properties: null,
  propertyImages: null,
  selectedProperty: null,
  selectedMarker: null,
  searchType: 'Sale',
  searchKeyword: '',
})

export default searchWidgetStore
