import React from 'react'
import { render } from '../../../tests/react-testing'
import { DiffMedia, DiffMediaProps } from '../diff-media'

const mockProps: DiffMediaProps = {
  currentMedia: 'https://media.jpg',
  changedMedia: 'https://media-changed.jpg',
  type: 'icon',
}

describe('DiffMedia', () => {
  it('should match snapshot', () => {
    const wrapper = render(<DiffMedia {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
