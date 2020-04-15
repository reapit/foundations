import { css } from 'emotion'
import { InitializerTheme } from '../../../common/styles/theme'

export interface AppointmentBookingThemeClasses {
  timeCell: string
  svgNavigation: string
  dateCellHeader: string
  timeCellsContainer: string
  formBlock: string
  formInput: string
  formHeader: string
  formLabel: string
  formSeparator: string
  formButtonPrimary: string
  formButtonSecondary: string
}

export type AppointmentBookingInitializerTheme = InitializerTheme & {
  timeCellBackgroundColor: string
  timeCellBackgroundColorHover: string
  navigateButtonColor: string
  dateCellHeaderBackgroundColor: string
  timeCellsContainerBackgroundColor: string
  formLabelColor: string
  formHrSeparatorFontColor: string
  formButtonFontSize: string
}

export const generateAppointmentBookingThemeClasses = (
  {
    basefontSize,
    primaryHeadingFontSize,
    headingFontFamily,
    primaryAccentColor,
    secondaryAccentColor,
    timeCellBackgroundColorHover,
    timeCellBackgroundColor,
    navigateButtonColor,
    dateCellHeaderBackgroundColor,
    timeCellsContainerBackgroundColor,
    formLabelColor,
    formHrSeparatorFontColor,
    formButtonFontSize,
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
    formBlock: css`
      ${parentSelector || 'body'} & {
        padding: 0.5rem 0;
      }
    `,
    formInput: css`
      ${parentSelector || 'body'} & {
        padding-left: 5px;
        height: 27px;
        font-size: ${basefontSize};
        &:disabled {
          cursor: not-allowed;
        }
      }
    `,
    formHeader: css`
      ${parentSelector || 'body'} & {
        font-size: ${primaryHeadingFontSize};
        font-weight: bold;
        font-family: ${headingFontFamily};
      }
    `,

    formLabel: css`
      ${parentSelector || 'body'} & {
        color: ${formLabelColor};
      }
    `,
    formSeparator: css`
      ${parentSelector || 'body'} & {
        border: 1px solid ${formHrSeparatorFontColor};
      }
    `,
    formButtonPrimary: css`
      ${parentSelector || 'body'} & {
        font-size: ${formButtonFontSize};
        padding: 0.5rem;
        background-color: ${primaryAccentColor};
        color: white;
        border-radius: 3px;
        cursor: pointer;
      }
    `,
    formButtonSecondary: css`
      ${parentSelector || 'body'} & {
        font-size: ${formButtonFontSize};
        padding: 0.5rem;
        background-color: ${secondaryAccentColor};
        color: white;
        border-radius: 3px;
        cursor: pointer;
      }
    `,
    formError: css`
      ${parentSelector || 'body'} & {
        font-size: calc(${basefontSize} * 80 / 100);
        color: #dd0000;
      }
    `,
  }
}
