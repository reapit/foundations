import { ReapitViewingBookingComponent } from '../index'

describe('ReactViewingWidgetComponent', () => {
  it('test match snapshot', () => {
    expect(
      ReapitViewingBookingComponent({
        apiKey: '',
        customerId: '',
        parentSelector: '#appointment-bookings-viewing',
        theme: {
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
        },
      }),
    ).toMatchSnapshot()
  })
})
