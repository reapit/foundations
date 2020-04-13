import { render } from '@testing-library/svelte'
import AppointmentBookings from '../appointment-bookings.svelte'

const props = {
  theme: {
    // appointment-bookings's specific styles
    dateCellHeaderBackgroundColor: '#ececec',
    timeCellBackgroundColor: '#dfdfdf',
    timeCellBackgroundColorHover: '#d3d3d3',
    timeCellsContainerBackgroundColor: '#f9f9f9',
    formLabelColor: '#737373',
    formHrSeparatorFontColor: '#e6e6e6',
    formButtonFontSize: '1.2rem',

    // base
    baseBackgroundColor: '#f9fbfd',
    basefontSize: '16px',
    basefontColor: '#12263f',
    inverseFontColor: '#f9fbfd',
    secondaryfontColor: '#1e2554',
    primaryHeadingFontSize: '24px',
    secondaryHeadingFontSize: '20px',
    baseFontFamily: '"Roboto", sans-serif',
    headingFontFamily: '"Open Sans", sans-serif',
    primaryAccentColor: '#0061a8',
    secondaryAccentColor: '#6c757d',
    mapAccentColor: '#7bc9eb',
    breakPoints: {
      mobile: '',
      tablet: '',
      laptop: '',
      desktop: '',
    },
  },
  parentSelector: '#appointment-bookings',
}

describe('AppointmentBookings', () => {
  it('should match snapshot', () => {
    const { container } = render(AppointmentBookings, props)
    expect(container).toMatchSnapshot()
  })
})
