import * as React from 'react'
import { shallow } from 'enzyme'
import { Button, IButton } from '../index'
import toJson from 'enzyme-to-json'

const props: IButton = {
  type: 'submit',
  intent: 'primary',
  disabled: false,
  loading: false,
  onClick: jest.fn(),
}

describe('Button', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Button {...props}>button text</Button>))).toMatchSnapshot()
  })

  it('should fire a click event correctly', () => {
    const wrapper = shallow(<Button {...props}>button text</Button>)
    wrapper.simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
