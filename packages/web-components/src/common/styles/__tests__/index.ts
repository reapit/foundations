import * as Styles from '../index'

describe('styles', () => {
  it('should generate a reset css class', () => {
    expect(Styles.resetCSS).toMatchSnapshot()
  })

  it('should generate an object of CSS classes', () => {
    expect(
      Styles.generateThemeStyles({
        baseBackgroundColor: 'white',
      }),
    ).toMatchSnapshot()
  })
})
