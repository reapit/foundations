import { writable, Writable } from 'svelte/store'
import { ViewingBookingInitializers } from './index'
import { ThemeClasses } from '../../../common/styles'

export interface ViewingBookingStore {
  initializers: ViewingBookingInitializers
  email: string
  isLoading: boolean
  themeClasses: ThemeClasses
}

const viewBookingStore: Writable<ViewingBookingStore> = writable({
  initializers: {
    apiKey: '',
    parentSelector: '',
    submitAction: null,
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
  },
  email: '',
  image: '',
  isLoading: false,
})

export default viewBookingStore
