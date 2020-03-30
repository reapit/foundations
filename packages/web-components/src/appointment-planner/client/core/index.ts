import AppointmentPlanner from '../components/appointment-planner.svelte'
import { InitializerTheme } from '../../../common/styles/index'

export interface AppointmentPlannerInitializers {
  theme: InitializerTheme
  apiKey: string
  target?: HTMLElement
}

export const ReapitAppointmentPlannerComponent = ({
  target = document.body,
  apiKey,
  theme,
}: AppointmentPlannerInitializers) =>
  new AppointmentPlanner({
    target,
    props: {
      theme,
      apiKey,
    },
  })

Object.defineProperty(window, 'ReapitAppointmentPlannerComponent', {
  value: ReapitAppointmentPlannerComponent,
})
