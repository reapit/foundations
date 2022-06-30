import React from 'react'
import { render } from '@testing-library/react'
import { PlaceholderImage, placeholderImageSet } from '..'

describe('PlaceholderImage component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PlaceholderImage placeholder="placeholderSmall" size={100} />)
    expect(wrapper).toMatchSnapshot()
  })

  Object.keys(placeholderImageSet).forEach((image) => {
    it(`should match a snapshot of image ${image}`, () => {
      const Image = placeholderImageSet[image]
      const wrapper = render(<Image />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
