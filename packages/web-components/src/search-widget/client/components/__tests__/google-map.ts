import GoogleMap from '../google-map.svelte'
import { render } from '@testing-library/svelte'
import searchWidgetStore from '../../core/store'
import createGoogleMapsMock from '../../utils/__mocks__/mock-google-map'
import { loadMap, centerMapToMarker, fitMapToBounds } from '../../utils/map-helpers'
import { propertiesStub } from '../../../server/api/__stubs__/properties'
import { PropertyModel } from '@reapit/foundations-ts-definitions'
import { propertyStub } from '../../utils/__stubs__/property'

jest.mock('../../../../common/utils/loader')

jest.mock('../../utils/map-helpers')

describe('check load map', () => {
  it('should load the map on mount', () => {
    render(GoogleMap, { theme: {} })
    expect(loadMap).toHaveBeenCalledTimes(1)
  })
})

describe('google map', () => {
  beforeAll(() => {
    createGoogleMapsMock()
  })

  it('it matches a snapshot', () => {
    const wrapper = render(GoogleMap, { theme: {} })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('should fit to map bounds on update', done => {
    render(GoogleMap, { theme: {} })

    searchWidgetStore.update(values => ({
      ...values,
      properties: propertiesStub._embedded as PropertyModel[],
    }))

    // Wait a frame for after update hook
    setTimeout(() => {
      expect(fitMapToBounds).toHaveBeenCalledTimes(1)
      done()
    }, 1)
  })

  it('should center map on update', done => {
    render(GoogleMap, { theme: {} })

    searchWidgetStore.update(values => ({
      ...values,
      selectedProperty: propertyStub,
    }))

    // Wait a frame for after update hook
    setTimeout(() => {
      expect(centerMapToMarker).toHaveBeenCalledTimes(1)
      done()
    }, 1)
  })
})
