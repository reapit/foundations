import { showPropertiesMarker } from '../google-map'
import createGoogleMapsMock from '../../../../common/utils/__mocks__/mock-google-map'
import { property } from '../../../../common/utils/__mocks__/property'
import { createMarker } from '../../../../common/utils/map-helper'
import searchWidgetStore, { SearchWidgetStore } from '../../core/store'

jest.mock('../../../../common/utils/map-helper')

describe('google-map utils', () => {
  it('should return correctly', () => {
    const maps = createGoogleMapsMock() as any
    maps.fitBounds = jest.fn()
    const storeInstance: SearchWidgetStore = {
      initializers: {
        apiKey: 'key',
        theme: {},
      },
      properties: { _embedded: [property] },
      propertyImages: {},
      selectedProperty: null,
      markers: [],
      mapLoading: false,
    }

    showPropertiesMarker(maps, storeInstance, searchWidgetStore)
    expect(createMarker).toHaveBeenCalledTimes(1)
  })

  // it('should return correctly when no properties', () => {
  //   const maps = createGoogleMapsMock() as any
  //   maps.fitBounds = jest.fn()
  //   const storeInstance: SearchWidgetStore = {
  //     initializers: {
  //       apiKey: 'key',
  //       theme: {},
  //     },
  //     properties: null,
  //     propertyImages: {},
  //     selectedProperty: null,
  //     markers: [],
  //     mapLoading: false,
  //   }

  //   showPropertiesMarker(maps, storeInstance, searchWidgetStore)
  //   expect(createMarker).toHaveBeenCalledTimes(0)
  // })
})
