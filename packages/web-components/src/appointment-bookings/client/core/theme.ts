import { css } from 'emotion'
import { InitializerTheme } from '../../../common/styles/theme'

/* istanbul ignore file */
export interface AppointmentBookingThemeClasses {
  item: string
  svgNavigation: string
}

export type AppointmentBookingInitializerTheme = InitializerTheme & {
  itemBackgroundColor: string
  itemBackgroundColorHover: string
  navigateButtonColor: string
}

export const generateAppointmentBookingThemeClasses = ({
  itemBackgroundColor,
  itemBackgroundColorHover,
  navigateButtonColor,
}: AppointmentBookingInitializerTheme): AppointmentBookingThemeClasses => {
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
