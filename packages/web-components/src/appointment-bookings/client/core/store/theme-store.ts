import { writable } from 'svelte/store'
import { AppointmentBookingThemeClasses } from '../theme'

export const themeStore = writable<AppointmentBookingThemeClasses | null>({
  timeCell: '',
  svgNavigation: '',
  timeCellsContainer: '',
  dateCellHeader: '',
})
