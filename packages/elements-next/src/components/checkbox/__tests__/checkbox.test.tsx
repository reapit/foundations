import React from 'react'
import { shallow } from 'enzyme'
import { Checkbox } from '../checkbox'

describe('Checkbox', () => {
  it('should match snapshot when true', () => {
    const wrapper = shallow(<Checkbox id="mockName" name="mockName" checked={true} className="mockClassName" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(<Checkbox name="mockName" label="mockLabel" value="option1" disabled={true} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot', () => {
    const wrapper = shallow(
      <div>
        <Checkbox name="mockName" label="mockLabel" value="option1" />
        <Checkbox name="mockName" label="mockLabel" value="option2" />
      </div>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
