import SearchForm from '../search-widget.svelte'
import { render, fireEvent } from '@testing-library/svelte'
import { getProperties } from '../../api/properties'
import { propertiesStub } from '../../../server/api/__stubs__/properties'
import searchWidgetStore from '../../core/store'
import { get } from 'svelte/store'
import createGoogleMapsMock from '../../../../common/utils/__mocks__/mock-google-map'

jest.mock('../../api/properties')

describe('search-form', () => {
  beforeAll(() => {
    createGoogleMapsMock()
  })

  it('it matches a snapshot', () => {
    const wrapper = render(SearchForm, {
      theme: {},
      apiKey: '',
    })
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('it triggers a data fetch for rentals', async () => {
    ;(getProperties as jest.Mock).mockImplementation(() => propertiesStub)

    const wrapper = render(SearchForm)
    const { getByTestId } = wrapper

    const getLettings = getByTestId('lettings')

    await fireEvent.click(getLettings)

    const store = get(searchWidgetStore)

    expect(store.properties).toEqual(propertiesStub)
  })

  it('it triggers a data fetch for sales', async () => {
    ;(getProperties as jest.Mock).mockImplementation(() => propertiesStub)

    const wrapper = render(SearchForm)
    const { getByTestId } = wrapper

    const getSales = getByTestId('sales')

    await fireEvent.click(getSales)

    const store = get(searchWidgetStore)

    expect(store.properties).toEqual(propertiesStub)
  })
})
