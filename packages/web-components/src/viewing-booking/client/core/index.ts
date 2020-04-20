import ViewingBooking from '../components/viewing-booking.svelte'
import { InitializerTheme } from '../../../common/styles/index'

export interface PropertyData {
  image: string
  address: string
  price: string
}
export interface ViewingBookingInitializers {
  theme: Partial<InitializerTheme>
  apiKey: string
  parentSelector: string
}

export const ReapitViewingBookingComponent = ({ parentSelector, apiKey, theme }: ViewingBookingInitializers) =>
  new ViewingBooking({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
      parentSelector,
    },
  })

Object.defineProperty(window, 'ReapitViewingBookingComponent', {
  value: ReapitViewingBookingComponent,
})
