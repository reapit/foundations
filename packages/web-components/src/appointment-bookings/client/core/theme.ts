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

export const generateAppointmentBookingThemeClasses = (
  { itemBackgroundColorHover, itemBackgroundColor, navigateButtonColor }: AppointmentBookingInitializerTheme,
  parentSelector: string,
) => {
  return {
    item: css`
      ${parentSelector || 'body'} & {
        background: ${itemBackgroundColor};
        &:hover {
          background: ${itemBackgroundColorHover};
        }
      }
    `,
    svgNavigation: css`
      ${parentSelector || 'body'} & {
        path {
          fill: ${navigateButtonColor};
        }
        width: 1em;
        height: 1em;
      }
    `,
  }
}
