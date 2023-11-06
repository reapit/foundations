import React from 'react'
import { render } from '@testing-library/react'
import { InputGroup } from '../'
import { Input } from '../../input'
import { Label } from '../../label'
import { Icon } from '../../icon'

describe('InputGroup component', () => {
  it('should match a snapshot when used in react shorthand mode', () => {
    const wrapper = render(<InputGroup id="myId" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when used in react shorthand mode, with a label', () => {
    const wrapper = render(<InputGroup id="myId" label="Enter your username" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when used in react shorthand mode, with an icon', () => {
    const wrapper = render(<InputGroup id="myId" icon="email" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when used in react shorthand mode, with an icon and a label', () => {
    const wrapper = render(<InputGroup id="myId" icon="email" label="Enter your username" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when used in explicit mode', () => {
    const wrapper = render(
      <InputGroup>
        <Input />
        <Icon icon="email">Please enter an email</Icon>
        <Label>Please enter a username</Label>
      </InputGroup>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
