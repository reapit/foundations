import { writable, Writable } from 'svelte/store'
import { SearchWidgeInitializers } from './index'
import { PagedResultPropertyModel_, PropertyImageModel, PropertyModel } from '@reapit/foundations-ts-definitions'
import { ThemeClasses } from '../../../common/styles'

export interface SearchWidgetStore {
  initializers: SearchWidgeInitializers
  themeClasses: ThemeClasses
  properties: PagedResultPropertyModel_ | null
  propertyImages: Record<string, PropertyImageModel> | null
  selectedProperty: PropertyModel | null
  selectedMarker: google.maps.Marker | null
  searchType: 'Sale' | 'Rent'
  searchKeyword: string
  isLoading: boolean
  resultsMessage: string
}

const searchWidgetStore: Writable<SearchWidgetStore> = writable({
  initializers: {
    apiKey: '',
    theme: {},
    target: '',
  },
  themeClasses: {
    globalStyles: '',
    primaryHeading: '',
    secondaryHeading: '',
    primaryStrapline: '',
    secondaryStrapline: '',
    selectedItem: '',
    bodyText: '',
    button: '',
    input: '',
    resultItem: '',
    searchBox: '',
  },
  properties: null,
  propertyImages: null,
  selectedProperty: null,
  selectedMarker: null,
  searchType: 'Sale',
  searchKeyword: '',
  isLoading: false,
  resultsMessage: '',
})

export default searchWidgetStore
