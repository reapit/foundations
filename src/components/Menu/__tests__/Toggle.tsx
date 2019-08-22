import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Toggle } from '../Toggle'

describe('Toggle', () => {
  it('should render correctly', () => {
    const mockProps = {
      isChecked: true,
      onChange: jest.fn()
    }
    const wrapper = shallow(<Toggle {...mockProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should render correctly', () => {
    const mockProps = {
      isChecked: false,
      onChange: jest.fn()
    }
    const wrapper = shallow(<Toggle {...mockProps} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })

  it('should call onChange when change input', () => {
    const mockProps = {
      isChecked: false,
      onChange: jest.fn()
    }
    const wrapper = shallow(<Toggle {...mockProps} />)
    const input = wrapper.find('input')
    input.simulate('change', { target: { value: 'Hello' } })
    expect(mockProps.onChange).toBeCalled()
  })
})
