import { css } from 'emotion'
import { InitializerTheme } from '../../../common/styles/theme'

/* istanbul ignore file */
export interface AppointmentPlannerThemeClasses {
  item: string
  svgNavigation: string
}

export type AppointmentPlannerInitializerTheme = InitializerTheme & {
  itemBackgroundColor: string
  itemBackgroundColorHover: string
  navigateButtonColor: string
}

export const generateAppointmentPlannerThemeClasses = ({
  itemBackgroundColor,
  itemBackgroundColorHover,
  navigateButtonColor,
}: AppointmentPlannerInitializerTheme): AppointmentPlannerThemeClasses => {
  return {
    item: css`
      background: ${itemBackgroundColor};
      &:hover {
        background: ${itemBackgroundColorHover};
      }
    `,
    svgNavigation: css`
      path {
        fill: ${navigateButtonColor};
      }
    `,
  }
}
