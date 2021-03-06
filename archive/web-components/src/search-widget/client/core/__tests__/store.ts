import searchWidgetStore, { SearchWidgetStore } from '../store'

describe('store', () => {
  it('should return a default object', () => {
    const expected: SearchWidgetStore = {
      initializers: {
        apiKey: '',
        customerId: '',
        theme: {},
        parentSelector: '',
        detailPageUrl: '',
      },
      themeClasses: {
        featureLabel: '',
        globalStyles: '',
        primaryHeading: '',
        secondaryHeading: '',
        primaryStrapline: '',
        secondaryStrapline: '',
        selectedItem: '',
        bodyText: '',
        button: '',
        input: '',
        featureButton: '',
        resultItem: '',
        searchBox: '',
        offerBanner: '',
        pagination: '',
        paginationActive: '',
        formError: '',
      },
      properties: [],
      propertyImagesByPropertyId: {},
      selectedProperty: null,
      selectedMarker: null,
      searchType: 'Sale',
      searchKeyword: '',
      isLoading: false,
      resultsMessage: '',
      pageNumber: 1,
      totalPage: 1,
    }
    const unsubscribeSearchWidgetStore = searchWidgetStore.subscribe(store => {
      expect(store).toEqual(expected)
    })
    unsubscribeSearchWidgetStore()
  })
})
