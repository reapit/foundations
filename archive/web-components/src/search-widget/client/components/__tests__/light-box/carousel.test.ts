import { render } from '@testing-library/svelte'
import Carousel from '../../light-box/carousel.svelte'

describe('Carousel', () => {
  it('should match snapshot', () => {
    const { container } = render(Carousel, {
      currentDisplayImageIndex: 0,
      displayItemQuantity: 2,
      images: ['image-url1', 'image-url2', 'image-url3', 'image-url4'],
    })
    expect(container).toMatchSnapshot()
  })
})
