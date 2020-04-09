import { css } from 'emotion'
import { InitializerTheme } from '../../../common/styles/theme'

export interface AppointmentBookingThemeClasses {
  timeCell: string
  svgNavigation: string
  dateCellHeader: string
  timeCellsContainer: string
}

export type AppointmentBookingInitializerTheme = InitializerTheme & {
  timeCellBackgroundColor: string
  timeCellBackgroundColorHover: string
  navigateButtonColor: string
  dateCellHeaderBackgroundColor: string
  timeCellsContainerBackgroundColor: string
}

export const generateAppointmentBookingThemeClasses = (
  {
    timeCellBackgroundColorHover,
    timeCellBackgroundColor,
    navigateButtonColor,
    dateCellHeaderBackgroundColor,
    timeCellsContainerBackgroundColor,
  }: AppointmentBookingInitializerTheme,
  parentSelector: string,
) => {
  return {
    timeCellsContainer: css`
      ${parentSelector || 'body'} & {
        background: ${timeCellsContainerBackgroundColor};
      }
    `,
    dateCellHeader: css`
      ${parentSelector || 'body'} & {
        padding: 1em;
        font-weight: bold;
        background: ${dateCellHeaderBackgroundColor};
        display: flex;
        justify-content: center;
        margin-bottom: 2px;
        min-height: 2.5em;
      }
    `,
    timeCell: css`
      ${parentSelector || 'body'} & {
        background: ${timeCellBackgroundColor};
        &:hover {
          background: ${timeCellBackgroundColorHover};
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
