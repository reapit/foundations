import GoogleMap from '../google-map.svelte'
import { render } from '@testing-library/svelte'
import { get } from 'svelte/store'
import { property as mockProperty } from '../../../../common/utils/__mocks__/property'
import searchWidgetStore from '../../core/store'
import createGoogleMapsMock from '../../../../common/utils/__mocks__/mock-google-map'

jest.mock('../../../../common/utils/loader')

describe('google map', () => {
  beforeAll(() => {
    createGoogleMapsMock()
  })

  it('it matches a snapshot', () => {
    const props = {
      properties: [mockProperty],
      propertyImages: null,
      selectedProperty: null,
    }
    const wrapper = render(GoogleMap, props)
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
