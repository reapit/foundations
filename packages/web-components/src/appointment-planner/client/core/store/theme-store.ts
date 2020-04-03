import { writable } from 'svelte/store'
import { AppointmentPlannerThemeClasses } from '../../core/theme'

export const themeStore = writable<AppointmentPlannerThemeClasses | null>({ item: '', svgNavigation: '' })
