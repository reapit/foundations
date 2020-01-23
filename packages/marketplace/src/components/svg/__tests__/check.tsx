import React from 'react'
import { shallow } from 'enzyme'
import Check from '../check'

describe('Check', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Check />)
    expect(wrapper).toMatchSnapshot()
  })
})
