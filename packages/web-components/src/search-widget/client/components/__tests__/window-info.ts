import WindowInfo from '../window-info.svelte'
import { render } from '@testing-library/svelte'
import { property as mockProperty } from '../../../../common/utils/__mocks__/property'
import createGoogleMapsMock from '../../../../common/utils/__mocks__/mock-google-map'

describe('WindowInfo', () => {
  it('it matches a snapshot', () => {
    const mockGoogleMap = createGoogleMapsMock()
    const mockMap = new mockGoogleMap.Map()
    const mockMarker = new mockGoogleMap.Marker({
      position: {
        lat: 51.507325,
        lng: -0.127716,
      },
      map: mockMap,
    })

    const props = {
      selectedMarker: mockMarker,
      propertyImages: null,
      selectedProperty: mockProperty,
      searchType: 'Rent',
      map: mockGoogleMap,
    }
    const wrapper = render(WindowInfo, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
