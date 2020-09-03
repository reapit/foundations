import React from 'react'
import { shallow } from 'enzyme'
import { DiffMedia, DiffMediaProps } from '../diff-media'

const mockProps: DiffMediaProps = {
  currentMedia: 'https://media.jpg',
  changedMedia: 'https://media-changed.jpg',
  type: 'icon',
}

describe('DiffMedia', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DiffMedia {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
