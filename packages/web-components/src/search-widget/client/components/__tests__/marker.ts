import Marker from '../marker.svelte'
import { render } from '@testing-library/svelte'
import { property as mockProperty } from '../../../../common/utils/__mocks__/property'
import createGoogleMapsMock from '../../../../common/utils/__mocks__/mock-google-map'

describe('Marker', () => {
  it('it matches a snapshot', () => {
    const mockGoogleMap = createGoogleMapsMock()
    const props = {
      property: mockProperty,
      map: mockGoogleMap,
    }
    const wrapper = render(Marker, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
