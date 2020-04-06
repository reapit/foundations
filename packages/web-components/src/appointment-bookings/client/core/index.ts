import AppointmentBooking from '../components/appointment-bookings.svelte'
import { AppointmentBookingInitializerTheme } from './theme'

export interface AppointmentBookingInitializers {
  theme: AppointmentBookingInitializerTheme
  apiKey: string
  parentSelector: string
}

export const ReapitAppointmentBookingComponent = ({ parentSelector, apiKey, theme }: AppointmentBookingInitializers) =>
  new AppointmentBooking({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
    },
  })

Object.defineProperty(window, 'ReapitAppointmentBookingComponent', {
  value: ReapitAppointmentBookingComponent,
})
