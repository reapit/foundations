import { writable } from 'svelte/store'
import { AppointmentPlannerInitializerTheme } from '../../core/theme'

export const themeStore = writable<AppointmentPlannerInitializerTheme | null>(null)
