import SearchWidget from '../search-widget.svelte'
import { render } from '@testing-library/svelte'
import searchWidgetStore from '../../core/store'
import { get } from 'svelte/store'
import createGoogleMapsMock from '../../../../common/utils/__mocks__/mock-google-map'

describe('search-widget', () => {
  beforeAll(() => {
    createGoogleMapsMock()
  })
  it('it matches a snapshot', () => {
    const wrapper = render(SearchWidget, {
      theme: {},
      apiKey: '',
    })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('it updates the default store on mount', () => {
    const props = {
      theme: {
        baseBackgroundColor: 'white',
      },
      apiKey: 'SOME_KEY',
    }
    render(SearchWidget, props)
    const store = get(searchWidgetStore)

    expect(store.initializers).toEqual(props)
  })
})
