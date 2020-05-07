import PropertyDetail from '../property-detail.svelte'
import { render } from '@testing-library/svelte'
import { propertyStub } from '../../utils/__stubs__/property'
import searchWidgetStore from '../../core/store'

const theme = {
  baseBackgroundColor: '',
  basefontSize: '',
  basefontColor: 'red',
  inverseFontColor: '',
  secondaryfontColor: '',
  primaryHeadingFontSize: '',
  secondaryHeadingFontSize: '',
  baseFontFamily: '',
  headingFontFamily: '',
  primaryAccentColor: '',
  secondaryAccentColor: '',
  mapAccentColor: '',
  breakPoints: {
    mobile: '',
    tablet: '',
    laptop: '',
    desktop: '',
  },
}

describe('PropertyDetail', () => {
  it('it matches a snapshot', () => {
    const props = {
      propertyId: propertyStub.id,
      theme,
      apiKey: '',
      parentSelector: '#search-widget',
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
