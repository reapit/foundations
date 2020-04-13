import Pagination from '../pagination.svelte'
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

describe('pagination', () => {
  beforeAll(() => {
    createGoogleMapsMock()
  })

  it('it matches a snapshot', () => {
    searchWidgetStore.update(store => ({
      ...store,
      properties: [],
      totalPage: 10,
      pageNumber: 2,
    }))
    const wrapper = render(Pagination)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('it triggers a data fetch for first-page', async () => {
    searchWidgetStore.update(store => ({
      ...store,
      properties: [],
      totalPage: 10,
      pageNumber: 2,
    }))
    ;(getProperties as jest.Mock).mockImplementation(() => propertiesMinimalStub)
    ;(getPropertyImages as jest.Mock).mockImplementation(() => propertyImagesMinimalStub)

    const wrapper = render(Pagination)
    const { getByTestId } = wrapper

    const firstPage = getByTestId('first-page')

    await fireEvent.click(firstPage)

    const store = get(searchWidgetStore)

    expect(store.properties).toEqual(propertiesMinimalStub._embedded)
    expect(store.propertyImages).toEqual(propertyImagesMinimalStub)
    expect(store.isLoading).toBe(false)
  })

  it('it triggers a data fetch for last-page', async () => {
    searchWidgetStore.update(store => ({
      ...store,
      properties: [],
      totalPage: 10,
      pageNumber: 2,
    }))
    ;(getProperties as jest.Mock).mockImplementation(() => propertiesMinimalStub)
    ;(getPropertyImages as jest.Mock).mockImplementation(() => propertyImagesMinimalStub)

    const wrapper = render(Pagination)
    const { getByTestId } = wrapper

    const lastPage = getByTestId('last-page')

    await fireEvent.click(lastPage)

    const store = get(searchWidgetStore)
    expect(store.properties).toEqual(propertiesMinimalStub._embedded)
    expect(store.propertyImages).toEqual(propertyImagesMinimalStub)
    expect(store.isLoading).toBe(false)
  })
})
