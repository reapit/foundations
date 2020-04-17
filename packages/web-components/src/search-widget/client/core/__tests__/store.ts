import searchWidgetStore, { SearchWidgetStore } from '../store'

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
        pagination: '',
        paginationActive: '',
      },
      properties: [],
      propertyImages: {},
      selectedProperty: null,
      selectedMarker: null,
      searchType: 'Sale',
      searchKeyword: '',
      isLoading: false,
      resultsMessage: '',
      pageNumber: 1,
      totalPage: 1,
    } as SearchWidgetStore
    const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
      expect(store).toEqual(expected)
    })
    unsubscribeSearchWidgetStore()
  })
})
