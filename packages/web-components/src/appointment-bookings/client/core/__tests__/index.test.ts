import { ReapitAppointmentBookingComponent } from '../index'

describe('ReapitAppointmentBookingComponent', () => {
  it('should match a snapshot', () => {
    expect(
      ReapitAppointmentBookingComponent({
        variant: 'VALUATION',
        parentSelector: 'body',
        apiKey: 'test',
        theme: {
          navigateButtonColor: 'red',
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
          basefontSize: '14px',
          basefontColor: '#12263f',
          inverseFontColor: '#f9fbfd',
          secondaryfontColor: '#1e2554',
          primaryHeadingFontSize: '24px',
          secondaryHeadingFontSize: '20px',
          baseFontFamily: '"Roboto", sans-serif',
          headingFontFamily: '"Open Sans", sans-serif',
          primaryAccentColor: '#0061a8',
          secondaryAccentColor: '#1e2554',
          mapAccentColor: '#7bc9eb',
          breakPoints: {
            mobile: '',
            tablet: '',
            laptop: '',
            desktop: '',
          },
          searchPlaceholder: 'e.g. London or EC1N',
        },
      }),
    ).toMatchSnapshot()
  })
})
