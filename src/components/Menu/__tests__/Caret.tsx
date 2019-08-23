import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Caret } from '../Caret'

describe('Caret', () => {
  it('should render correctly', () => {
    const mockProps = {
      isActive: true
    }
    const wrapper = shallow(<Caret {...mockProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render correctly', () => {
    const mockProps = {
      isActive: false
    }
    const wrapper = shallow(<Caret {...mockProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
