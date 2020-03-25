import GoogleMap from '../google-map.svelte'
import { render } from '@testing-library/svelte'
import { get } from 'svelte/store'
import searchWidgetStore from '../../core/store'
import createGoogleMapsMock from '../../utils/__mocks__/mock-google-map'

jest.mock('../../../../common/utils/loader')

describe('google map', () => {
  beforeAll(() => {
    createGoogleMapsMock()
  })

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
