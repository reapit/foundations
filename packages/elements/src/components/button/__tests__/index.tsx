import * as React from 'react'
import { shallow } from 'enzyme'
import { Button, IButton, FloatingButton, ButtonGroup, resolveButtonSize } from '../index'
import { elButtonSize2, elButtonSize3, elButtonSize4 } from '../__styles__'

const props: IButton = {
  type: 'submit',
  intent: 'primary',
  disabled: false,
  loading: false,
  onClick: jest.fn(),
}

describe('Button', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Button {...props}>button text</Button>)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    expect(shallow(<FloatingButton icon="addSystem" {...props}>button text</FloatingButton>)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    expect(shallow(<ButtonGroup>
      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>
    </ButtonGroup>)).toMatchSnapshot()
  })

  it('should fire a click event correctly', () => {
    const wrapper = shallow(<Button {...props}>button text</Button>)
    wrapper.simulate('click')
    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  it('should return button size class', () => {
    expect(resolveButtonSize(2)).toBe(elButtonSize2)
    expect(resolveButtonSize(3)).toBe(elButtonSize3)
    expect(resolveButtonSize(4)).toBe(elButtonSize4)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
