import * as React from 'react'
import { render } from '../../../tests/react-testing'
import Tag from '../'

describe('Tag component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Tag label="I am a tag" />)
    expect(wrapper).toMatchSnapshot()
  })
})
