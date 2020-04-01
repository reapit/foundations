import SearchForm from '../search-form.svelte'
import { render, fireEvent } from '@testing-library/svelte'
import { getProperties } from '../../api/properties'
import { getPropertyImages } from '../../api/property-images'
import { propertiesStub } from '../../../server/api/__stubs__/properties'
import { propertyImagesStub } from '../../../server/api/__stubs__/property-images'
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
    ;(getProperties as jest.Mock).mockImplementation(() => propertiesStub)
    ;(getPropertyImages as jest.Mock).mockImplementation(() => propertyImagesStub)

    const wrapper = render(SearchForm)
    const { getByTestId } = wrapper

    const getLettings = getByTestId('lettings')

    await fireEvent.click(getLettings)

    const store = get(searchWidgetStore)

    expect(store.properties).toEqual(propertiesStub._embedded)
    expect(store.propertyImages).toEqual(propertyImagesStub)
    expect(store.isLoading).toBe(false)
    expect(store.resultsMessage).toBe('1 result for rent')
  })

  it('it triggers a data fetch for sales', async () => {
    ;(getProperties as jest.Mock).mockImplementation(() => propertiesStub)
    ;(getPropertyImages as jest.Mock).mockImplementation(() => propertyImagesStub)

    const wrapper = render(SearchForm)
    const { getByTestId } = wrapper

    const getSales = getByTestId('sales')

    await fireEvent.click(getSales)

    const store = get(searchWidgetStore)
    expect(store.properties).toEqual(propertiesStub._embedded)
    expect(store.propertyImages).toEqual(propertyImagesStub)
    expect(store.isLoading).toBe(false)
    expect(store.resultsMessage).toBe('1 result for sale')
  })
})
