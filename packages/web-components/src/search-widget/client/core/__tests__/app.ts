import App from '../app.svelte'
import { render } from '@testing-library/svelte'

const theme = {
  baseBackgroundColor: '',
  basefontSize: '',
  basefontColor: 'red',
  inverseFontColor: '',
  secondaryfontColor: '',
  primaryHeadingFontSize: '',
  secondaryHeadingFontSize: '',
  baseFontFamily: '',
  headingFontFamily: '',
  primaryAccentColor: '',
  secondaryAccentColor: '',
  mapAccentColor: '',
  breakPoints: {
    mobile: '',
    tablet: '',
    laptop: '',
    desktop: '',
  },
}

describe('app', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(App, {
      theme,
      apiKey: '',
      parentSelector: '#search-widget',
    })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
