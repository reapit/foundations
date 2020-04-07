import WindowInfo from '../window-info.svelte'
import { render } from '@testing-library/svelte'
import { propertyStub } from '../../utils/__stubs__/property'
import createGoogleMapsMock from '../../utils/__mocks__/mock-google-map'
import { getInfoWindow } from '../../utils/map-helpers'

jest.mock('../../../../common/utils/loader')
jest.mock('../../utils/map-helpers')

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
  selectedProperty: propertyStub,
  searchType: 'Rent',
  map: mockGoogleMap,
  themeClasses: {},
}
describe('WindowInfo', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(WindowInfo, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('it calls getInfoWindow on mount and on update', () => {
    render(WindowInfo, props)

    expect(getInfoWindow).toHaveBeenCalledTimes(2)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
