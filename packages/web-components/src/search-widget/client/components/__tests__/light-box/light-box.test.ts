import { render } from '@testing-library/svelte'
import LightBox from '../../light-box/light-box.svelte'

describe('LightBox', () => {
  it('should match snapshot', () => {
    const { container } = render(LightBox, {
      displayItemQuantity: 5,
      images: [],
    })
    expect(container).toMatchSnapshot()
  })
})
