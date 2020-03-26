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
      selectedProperty: null,
      selectedMarker: null,
      searchType: 'Sale',
      searchKeyword: '',
    }
    const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
      expect(store).toEqual(expected)
    })
    unsubscribeSearchWidgetStore()
  })
})
