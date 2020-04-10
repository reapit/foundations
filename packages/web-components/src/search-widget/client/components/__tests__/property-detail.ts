import PropertyDetail from '../property-detail.svelte'
import { render } from '@testing-library/svelte'
import { propertyStub } from '../../utils/__stubs__/property'
import searchWidgetStore from '../../core/store'

describe('PropertyDetail', () => {
  it('it matches a snapshot', () => {
    const props = {
      property: propertyStub,
    }
    searchWidgetStore.update(store => ({
      ...store,
      selectedProperty: propertyStub,
    }))
    const wrapper = render(PropertyDetail, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
