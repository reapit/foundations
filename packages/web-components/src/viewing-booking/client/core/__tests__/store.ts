import viewingBookingStore from '../store'

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
      },
    }
    const unsubscribe = viewingBookingStore.subscribe(store => {
      expect(store).toEqual(expected)
    })
    unsubscribe()
  })
})
