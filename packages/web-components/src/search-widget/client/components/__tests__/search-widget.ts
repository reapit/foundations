import SearchWidget from '../search-widget.svelte'
import { render } from '@testing-library/svelte'
import searchWidgetStore from '../../core/store'
import { get } from 'svelte/store'
import createGoogleMapsMock from '../../utils/__mocks__/mock-google-map'

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

describe('search-widget', () => {
  beforeAll(() => {
    createGoogleMapsMock()
  })
  it('it matches a snapshot', () => {
    const wrapper = render(SearchWidget, {
      theme,
      apiKey: '',
      customerId: '',
      parentSelector: '#search-widget',
    })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('it updates the default store on mount', () => {
    const props = {
      theme,
      apiKey: 'SOME_KEY',
      customerId: 'DEMO',
      parentSelector: '#search-widget',
    }
    render(SearchWidget, props)
    const store = get(searchWidgetStore)

    expect(store.initializers).toEqual(props)
  })
})
