import Marker from '../marker.svelte'
import { render } from '@testing-library/svelte'
import { propertyStub } from '../../utils/__stubs__/property'
import createGoogleMapsMock from '../../utils/__mocks__/mock-google-map'

describe('Marker', () => {
  it('it matches a snapshot', () => {
    const mockGoogleMap = createGoogleMapsMock()
    const props = {
      property: propertyStub,
      map: mockGoogleMap,
    }
    const wrapper = render(Marker, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
