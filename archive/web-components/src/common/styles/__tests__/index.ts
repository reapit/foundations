import * as Styles from '../index'
import { stubTheme, stubThemeBooking } from '../../../search-widget/client/utils/__stubs__/theme'

describe('styles', () => {
  it('should generate a reset css class', () => {
    expect(Styles.resetCSS).toMatchSnapshot()
  })

  it('should generate an object of CSS classes', () => {
    expect(Styles.generateBaseThemeClasses(stubTheme, '#search-widget')).toMatchSnapshot()
  })

  it('should generate an object of CSS classes', () => {
    expect(Styles.generateBookingThemeClasses(stubThemeBooking, '#search-widget')).toMatchSnapshot()
  })

  it('should generate a map theme', () => {
    expect(Styles.generateMapStyles(stubTheme)).toMatchSnapshot()
  })
})
