import SearchForm from '../search-form.svelte'
import { render, fireEvent } from '@testing-library/svelte'
import { getProperties } from '../../api/properties'
import { getPropertyImages } from '../../api/property-images'
import { propertiesMinimalStub } from '../../../server/api/__stubs__/properties'
import { propertyImagesMinimalStub } from '../../../server/api/__stubs__/property-images'
import searchWidgetStore from '../../core/store'
import { get } from 'svelte/store'
import createGoogleMapsMock from '../../utils/__mocks__/mock-google-map'

jest.mock('../../api/properties')
jest.mock('../../api/property-images')

describe('search-form', () => {
  beforeAll(() => {
    createGoogleMapsMock()
  })

  it('it matches a snapshot', () => {
    const wrapper = render(SearchForm)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('it triggers a data fetch for rentals', async () => {
    ;(getProperties as jest.Mock).mockImplementation(() => propertiesMinimalStub)
    ;(getPropertyImages as jest.Mock).mockImplementation(() => propertyImagesMinimalStub)

    const wrapper = render(SearchForm)
    const { getByTestId } = wrapper

    const getLettings = getByTestId('lettings')

    await fireEvent.click(getLettings)

    const btnSearch = getByTestId('btnSearch')

    await fireEvent.click(btnSearch)

    const store = get(searchWidgetStore)

    expect(store.properties).toEqual(propertiesMinimalStub._embedded)
    expect(store.propertyImagesByPropertyId).toEqual(propertyImagesMinimalStub)
    expect(store.isLoading).toBe(false)
    expect(store.resultsMessage).toBe('3096 results for rent')
  })

  it('it triggers a data fetch for sales', async () => {
    ;(getProperties as jest.Mock).mockImplementation(() => propertiesMinimalStub)
    ;(getPropertyImages as jest.Mock).mockImplementation(() => propertyImagesMinimalStub)

    const wrapper = render(SearchForm)
    const { getByTestId } = wrapper

    const getSales = getByTestId('sales')

    await fireEvent.click(getSales)

    const btnSearch = getByTestId('btnSearch')

    await fireEvent.click(btnSearch)

    const store = get(searchWidgetStore)
    expect(store.properties).toEqual(propertiesMinimalStub._embedded)
    expect(store.propertyImagesByPropertyId).toEqual(propertyImagesMinimalStub)
    expect(store.isLoading).toBe(false)
    expect(store.resultsMessage).toBe('3096 results for sale')
  })

  it('show/hide advanced search container', async () => {
    jest.useFakeTimers()

    const wrapper = render(SearchForm)
    const { getByTestId } = wrapper

    const btnAdvancedSearch = getByTestId('btnAdvancedSearch')
    await fireEvent.click(btnAdvancedSearch)

    setTimeout(() => {
      const advancedSearchContainer = getByTestId('advanced-search-container')
      expect(advancedSearchContainer).toBeInstanceOf(HTMLElement)
    }, 500)

    jest.clearAllTimers()
  })
})
