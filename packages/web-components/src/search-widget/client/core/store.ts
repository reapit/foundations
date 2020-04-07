import { writable, Writable } from 'svelte/store'
import { SearchWidgeInitializers } from './index'
import { PickedPropertyModel, PickedPropertyImageModel } from '../../types'
import { ThemeClasses } from '../../../common/styles'

export interface SearchWidgetStore {
  initializers: SearchWidgeInitializers
  themeClasses: ThemeClasses
  properties: PickedPropertyModel[]
  propertyImages: Record<string, PickedPropertyImageModel> | null
  selectedProperty: PickedPropertyModel | null
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
    parentSelector: '',
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
    offerBanner: '',
  },
  properties: [],
  propertyImages: {},
  selectedProperty: null,
  selectedMarker: null,
  searchType: 'Sale',
  searchKeyword: '',
  isLoading: false,
  resultsMessage: '',
})

export default searchWidgetStore
