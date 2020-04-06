import { writable } from 'svelte/store'
import { AppointmentBookingThemeClasses } from '../theme'

export const themeStore = writable<AppointmentBookingThemeClasses | null>({ item: '', svgNavigation: '' })
