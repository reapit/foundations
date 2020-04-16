import ViewingBooking from '../components/viewing-booking.svelte'
import { InitializerTheme } from '../../../common/styles/index'

export interface ViewingBookingInitializers {
  theme: Partial<InitializerTheme>
  apiKey: string
  parentSelector: string
  submitAction: ((email: string) => void) | null
}

export const ReapitViewingBookingComponent = ({
  parentSelector,
  apiKey,
  theme,
  submitAction,
}: ViewingBookingInitializers) =>
  new ViewingBooking({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
      parentSelector,
      submitAction,
    },
  })

Object.defineProperty(window, 'ReapitViewingBookingComponent', {
  value: ReapitViewingBookingComponent,
})
