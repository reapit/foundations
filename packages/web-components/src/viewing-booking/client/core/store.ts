import { writable, Writable } from 'svelte/store'
import { ViewingBookingInitializers, PropertyData } from './index'
import { ThemeClasses } from '../../../common/styles'

export interface ViewingBookingStore {
  initializers: ViewingBookingInitializers
  themeClasses: ThemeClasses

  email: string
  propertyData: PropertyData
  isLoading: boolean
}

const viewBookingStore: Writable<ViewingBookingStore> = writable({
  initializers: {
    apiKey: '',
    parentSelector: '',
    theme: {},
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
    pagination: '',
    paginationActive: '',
  },
  email: '',
  isLoading: false,
  propertyData: {
    image: '',
    address: '',
    price: '',
  },
})

export default viewBookingStore
