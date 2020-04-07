import SearchResult from '../search-result.svelte'
import { render, fireEvent } from '@testing-library/svelte'
import { propertyStub } from '../../utils/__stubs__/property'
import searchWidgetStore from '../../core/store'
import { get } from 'svelte/store'

describe('SearchResult', () => {
  it('it matches a snapshot', () => {
    const props = {
      property: propertyStub,
    }
    searchWidgetStore.update(store => ({
      ...store,
      selectedProperty: propertyStub,
    }))
    const wrapper = render(SearchResult, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })

  it('it triggers selected property behaviour', async () => {
    const props = {
      property: propertyStub,
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

    expect(store.selectedProperty).toEqual(propertyStub)
  })
})
