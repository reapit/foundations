import searchWidgetStore from '../store'

describe('store', () => {
  it('should return a default object', () => {
    const expected = {
      initializers: {
        apiKey: '',
        theme: {},
        parentSelector: '',
      },
      themeClasses: {
        globalStyles: '',
        primaryHeading: '',
        secondaryHeading: '',
        primaryStrapline: '',
        secondaryStrapline: '',
        selectedItem: '',
        bodyText: '',
        button: '',
        input: '',
        resultItem: '',
        searchBox: '',
        offerBanner: '',
      },
      properties: [],
      propertyImages: {},
      selectedProperty: null,
      selectedMarker: null,
      searchType: 'Sale',
      searchKeyword: '',
      isLoading: false,
      resultsMessage: '',
    }
    const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
      expect(store).toEqual(expected)
    })
    unsubscribeSearchWidgetStore()
  })
})
