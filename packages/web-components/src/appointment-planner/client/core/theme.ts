import { css } from 'emotion'
import { InitializerTheme } from '../../../common/styles/theme'

/* istanbul ignore file */
export interface AppointmentPlannerThemeClasses {
  item: string
}

export type AppointmentPlannerInitializerTheme = InitializerTheme & {
  itemBackgroundColor: string
  itemBackgroundColorHover: string
}

export const generateAppointmentPlannerThemeClasses = ({
  itemBackgroundColor,
  itemBackgroundColorHover,
}: AppointmentPlannerInitializerTheme): AppointmentPlannerThemeClasses => {
  return {
    item: css`
      background: ${itemBackgroundColor};
      &:hover {
        background: ${itemBackgroundColorHover};
      }
    `,
  }
}
