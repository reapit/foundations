import { render } from '@testing-library/svelte'
import EnlargeImageModal from '../../light-box/enlarge-image-modal.svelte'

describe('Carousel', () => {
  it('should match snapshot', () => {
    const { container } = render(EnlargeImageModal, {
      currentDisplayImageIndex: 0,
      imageQuantity: 10,
      currentDisplayImage: 'current-display-image-url',
      isModalOpen: true,
      toggleModal: jest.fn(),
      widgetNextButton: jest.fn(),
      widgetPrevButton: jest.fn(),
    })
    expect(container).toMatchSnapshot()
  })
})
