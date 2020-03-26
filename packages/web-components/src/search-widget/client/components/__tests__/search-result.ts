import SearchResult from '../search-result.svelte'
import { render, fireEvent } from '@testing-library/svelte'
import { property as mockProperty } from '../../utils/__mocks__/property'
import searchWidgetStore from '../../core/store'
import { get } from 'svelte/store'

describe('SearchResult', () => {
  it('it matches a snapshot', () => {
    const props = {
      property: mockProperty,
    }
    searchWidgetStore.update(store => ({
      ...store,
      selectedProperty: mockProperty,
    }))
    const wrapper = render(SearchResult, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('it triggers selected property behaviour', async () => {
    const props = {
      property: mockProperty,
    }
    searchWidgetStore.update(store => ({
      ...store,
      selectedProperty: null,
    }))
    const wrapper = render(SearchResult, props)

    const { getByTestId } = wrapper

    const selectProperty = getByTestId('select-property')

    await fireEvent.click(selectProperty)

    const store = get(searchWidgetStore)

    expect(store.selectedProperty).toEqual(mockProperty)
  })
})
