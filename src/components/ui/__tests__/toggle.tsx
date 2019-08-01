import * as React from 'react'
import { shallow } from 'enzyme'
import Toggle from '../toggle'
import toJson from 'enzyme-to-json'

describe('Toggle', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Toggle isChecked onChange={jest.fn()} />))).toMatchSnapshot()
  })

  it('responds to an onChange event', () => {
    const onChange = jest.fn()
    const wrapper = shallow(<Toggle isChecked onChange={onChange} />)
    wrapper
      .find('input')
      .first()
      .simulate('change')
    expect(onChange).toBeCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
