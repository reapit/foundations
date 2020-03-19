import Marker from '../marker.svelte'
import { render } from '@testing-library/svelte'
import { property as mockProperty } from '../../../../common/utils/__mocks__/property'

describe('Marker', () => {
  it('it matches a snapshot', () => {
    const props = {
      property: mockProperty,
    }
    const wrapper = render(Marker, props)
    const { container } = wrapper

    expect(container).toMatchSnapshot()
  })
})
