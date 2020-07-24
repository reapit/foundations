import { writable, Writable } from 'svelte/store'
import { BookViewingWidgetInitializers } from './index'
import { ThemeBookingClasses } from '../../../common/styles/types'

export interface BookViewingWidgetStore {
  initializers: Omit<BookViewingWidgetInitializers, 'submitAction'>
  themeClasses: ThemeBookingClasses

  email: string
  propertyData: PropertyData
  isLoading: boolean
}

export interface PropertyData {
  image: string
  address: string
  price: string
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
    featureButton: '',
    paginationActive: '',
    formError: '',
    timeCell: '',
    svgNavigation: '',
    dateCellHeader: '',
    timeCellsContainer: '',
    formBlock: '',
    formInput: '',
    formHeader: '',
    formLabel: '',
    formSeparator: '',
    formButtonPrimary: '',
    formButtonSecondary: '',
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
