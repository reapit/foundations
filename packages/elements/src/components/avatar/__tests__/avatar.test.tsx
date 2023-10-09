import React from 'react'
import { render } from '@testing-library/react'
import { Avatar } from '..'

describe('Avatar component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Avatar>Some Content</Avatar>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for an image src', () => {
    const wrapper = render(<Avatar src="https://picsum.photos/200" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for an image type', () => {
    const wrapper = render(<Avatar type="image" src="https://picsum.photos/200" />)
    expect(wrapper).toMatchSnapshot()
  })
})
