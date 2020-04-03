import AppointmentPlanner from '../components/appointment-planner.svelte'
import { AppointmentPlannerThemeClasses } from './theme'

export interface AppointmentPlannerInitializers {
  theme: AppointmentPlannerThemeClasses
  apiKey: string
  parentSelector: string
}

export const ReapitAppointmentPlannerComponent = ({ parentSelector, apiKey, theme }: AppointmentPlannerInitializers) =>
  new AppointmentPlanner({
    target: document.querySelector(parentSelector) || document.body,
    props: {
      theme,
      apiKey,
    },
  })

Object.defineProperty(window, 'ReapitAppointmentPlannerComponent', {
  value: ReapitAppointmentPlannerComponent,
})
