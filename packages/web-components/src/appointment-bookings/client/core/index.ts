import AppointmentBooking from '../components/appointment-bookings.svelte'
import { AppointmentBookingInitializerTheme } from './theme'

export interface AppointmentBookingInitializers {
  theme: AppointmentBookingInitializerTheme
  apiKey: string
  parentSelector: string
  variant: 'VIEWING' | 'VALUATION'
}

export const ReapitAppointmentBookingComponent = ({
  parentSelector,
  apiKey,
  theme,
  variant,
}: AppointmentBookingInitializers) => {
  new AppointmentBooking({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
      variant,
    },
  })
}
Object.defineProperty(window, 'ReapitAppointmentBookingComponent', {
  value: ReapitAppointmentBookingComponent,
})
