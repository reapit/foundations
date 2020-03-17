import searchWidgetStore from '../store'

describe('store', () => {
  it('should return a default object', () => {
    const expected = {
      initializers: {
        apiKey: '',
        theme: {},
      },
      properties: null,
      propertyImages: null,
      mapLoading: false,
      markers: [],
      selectedProperty: null,
    }
    const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
      expect(store).toEqual(expected)
    })
    unsubscribeSearchWidgetStore()
  })
})
