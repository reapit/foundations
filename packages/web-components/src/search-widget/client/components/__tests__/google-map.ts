import GoogleMap from '../google-map.svelte'
import { render } from '@testing-library/svelte'
import { get } from 'svelte/store'
// import { loader } from '../../../../common/utils/loader'
import searchWidgetStore from '../../core/store'

jest.mock('../../../../common/utils/loader')

describe('search-widget', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(GoogleMap)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('should run correctly', () => {
    render(GoogleMap)
    const store = get(searchWidgetStore)
    expect(store.initializers).toEqual({
      apiKey: '',
      theme: {},
    })
  })
})
