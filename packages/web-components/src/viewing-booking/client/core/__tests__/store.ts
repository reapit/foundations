import viewingBookingStore from '../store'

describe('store', () => {
  it('should return a default store', () => {
    const expected = {
      initializers: {
        apiKey: '',
        parentSelector: '',
        submitAction: null,
        theme: {},
      },
      email: '',
      image: '',
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
      },
    }
    const unsubscribe = viewingBookingStore.subscribe(store => {
      expect(store).toEqual(expected)
    })
    unsubscribe()
  })
})
