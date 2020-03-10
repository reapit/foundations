import * as Styles from '../index'

describe('styles', () => {
  it('should generate a reset css class', () => {
    expect(Styles.resetCSS).toMatchSnapshot()
  })

  it('should generate a global CSS theme', () => {
    expect(
      Styles.generateGlobalTheme({
        baseBackgroundColor: 'white',
      }),
    ).toMatchSnapshot()
  })
})
