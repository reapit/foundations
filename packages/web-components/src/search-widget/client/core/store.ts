import { writable, Writable } from 'svelte/store'
import { SearchWidgeInitializers } from './index'
import { PickedPropertyModel, PickedPropertyImageModel } from '../../types'
import { ThemeClasses } from '../../../common/styles'

export interface SearchWidgetStore {
  initializers: SearchWidgeInitializers
  themeClasses: ThemeClasses
  properties: PickedPropertyModel[]
  propertyImagesByPropertyId: Record<string, PickedPropertyImageModel[]> | null
  selectedProperty: PickedPropertyModel | null
  selectedMarker: google.maps.Marker | null
  searchType: 'Sale' | 'Rent'
  searchKeyword: string
  isLoading: boolean
  resultsMessage: string
  pageNumber: number
  totalPage: number
}

const searchWidgetStore: Writable<SearchWidgetStore> = writable({
  initializers: {
    apiKey: '',
    customerId: '',
    theme: {},
    parentSelector: '',
    detailPageUrl: '',
  },
  themeClasses: {
    featureLabel: '',
    globalStyles: '',
    primaryHeading: '',
    secondaryHeading: '',
    primaryStrapline: '',
    secondaryStrapline: '',
    selectedItem: '',
    bodyText: '',
    featureButton: '',
    button: '',
    input: '',
    resultItem: '',
    searchBox: '',
    offerBanner: '',
    pagination: '',
    paginationActive: '',
    formError: '',
  },
  properties: [],
  propertyImagesByPropertyId: {},
  selectedProperty: null,
  selectedMarker: null,
  searchType: 'Sale',
  searchKeyword: '',
  isLoading: false,
  resultsMessage: '',
  pageNumber: 1,
  totalPage: 1,
})

export default searchWidgetStore
