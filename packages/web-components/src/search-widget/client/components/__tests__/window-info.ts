import WindowInfo from '../window-info.svelte'
import { render } from '@testing-library/svelte'
import { property as mockProperty } from '../../../../common/utils/__mocks__/property'
import createGoogleMapsMock from '../../helpers/mock-google-maps'

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
      marker: mockMarker,
      propertyImages: null,
      property: mockProperty,
      searchType: 'Rent',
    }
    const wrapper = render(WindowInfo, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
