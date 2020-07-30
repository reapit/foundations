import bookViewingWidgetStore from '../store'

describe('store', () => {
  it('should return a default store', () => {
    const expected = {
      initializers: {
        apiKey: '',
        customerId: '',
        parentSelector: '',
        theme: {},
      },
      email: '',
      propertyData: { image: '', address: '', price: '' },
      isLoading: false,
      themeClasses: {
        featureLabel: '',
        featureButton: '',
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
        formError: '',
        timeCell: '',
        svgNavigation: '',
        dateCellHeader: '',
        timeCellsContainer: '',
        formBlock: '',
        formInput: '',
        formHeader: '',
        formLabel: '',
        formSeparator: '',
        formButtonPrimary: '',
        formButtonSecondary: '',
      },
    }
    const unsubscribe = bookViewingWidgetStore.subscribe(store => {
      expect(store).toEqual(expected)
    })
    unsubscribe()
  })
})
