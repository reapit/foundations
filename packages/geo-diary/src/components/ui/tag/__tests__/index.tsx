import * as React from 'react'
import { shallow } from 'enzyme'
import Tag from '../'

describe('Tag component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Tag label="I am a tag" />)
    expect(wrapper).toMatchSnapshot()
  })
})
