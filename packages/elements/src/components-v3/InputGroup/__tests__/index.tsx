import * as React from 'react'
import { shallow } from 'enzyme'
import { InputGroup } from '../'
import { Input } from '../../Input'
import { Label } from '../../Label'
import { Icon } from '../../Icon'

describe('InputGroup component', () => {
  it('should match a snapshot when used in react shorthand mode', () => {
    const wrapper = shallow(<InputGroup id="myId" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when used in react shorthand mode, with a label', () => {
    const wrapper = shallow(<InputGroup id="myId" label="Enter your username" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when used in react shorthand mode, with an icon', () => {
    const wrapper = shallow(<InputGroup id="myId" icon="email" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when used in react shorthand mode, with an icon and a label', () => {
    const wrapper = shallow(<InputGroup id="myId" icon="email" label="Enter your username" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when used in explicit mode', () => {
    const wrapper = shallow(
      <InputGroup>
        <Input />
        <Icon icon="email">Please enter an email</Icon>
        <Label>Please enter a username</Label>
      </InputGroup>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
