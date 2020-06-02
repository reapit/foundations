import { writable, Writable } from 'svelte/store'
import { BookViewingWidgetInitializers, PropertyData } from './index'
import { ThemeClasses } from '../../../common/styles'

export interface BookViewingWidgetStore {
  initializers: BookViewingWidgetInitializers
  themeClasses: ThemeClasses

  email: string
  propertyData: PropertyData
  isLoading: boolean
}

const bookViewingWigetStore: Writable<BookViewingWidgetStore> = writable({
  initializers: {
    apiKey: '',
    customerId: '',
    parentSelector: '',
    theme: {},
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
    button: '',
    input: '',
    resultItem: '',
    searchBox: '',
    offerBanner: '',
    pagination: '',
    advanceSearchButton: '',
    paginationActive: '',
    formError: '',
  },
  email: '',
  isLoading: false,
  propertyData: {
    image: '',
    address: '',
    price: '',
  },
})

export default bookViewingWigetStore
