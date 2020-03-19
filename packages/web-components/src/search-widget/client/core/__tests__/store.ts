import searchWidgetStore from '../store'

describe('store', () => {
  it('should return a default object', () => {
    const expected = {
      initializers: {
        apiKey: '',
        theme: {},
      },
      properties: [],
      propertyImages: null,
    }
    const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
      expect(store).toEqual(expected)
    })
    unsubscribeSearchWidgetStore()
  })
})
