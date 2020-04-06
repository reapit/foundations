import { ReapitAppointmentBookingComponent } from '../index'

describe('ReapitAppointmentBookingComponent', () => {
  it('should match a snapshot', () => {
    expect(
      ReapitAppointmentBookingComponent({
        parentSelector: 'body',
        apiKey: 'test',
        theme: {
          navigateButtonColor: 'red',
          itemBackgroundColor: 'green',
          itemBackgroundColorHover: 'red',
          baseBackgroundColor: '#4C566A',
          basefontSize: '14px',
          basefontColor: '#fff',
          inverseFontColor: '#4C566A',
          secondaryfontColor: '#88C0D0',
          primaryHeadingFontSize: '28px',
          secondaryHeadingFontSize: '24px',
          baseFontFamily: '"Open Sans", sans-serif',
          headingFontFamily: '"Roboto Slab", serif',
          primaryAccentColor: '#A3BE8C',
          secondaryAccentColor: '##88C0D0',
          mapAccentColor: '#8FBCBB',
          breakPoints: {
            mobile: '',
            tablet: '',
            laptop: '',
            desktop: '',
          },
        },
      }),
    ).toMatchSnapshot()
  })
})
