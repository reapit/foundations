import PropertyDetailWidget from '../property-detail-widget.svelte'
import { render } from '@testing-library/svelte'
import { propertyStub } from '../../../../search-widget/client/utils/__stubs__/property'

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

describe('PropertyDetailWidget', () => {
  it('it matches a snapshot', () => {
    const props = {
      propertyId: propertyStub.id,
      theme,
      apiKey: '',
      parentSelector: '#property-detail-widget',
    }

    const wrapper = render(PropertyDetailWidget, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
