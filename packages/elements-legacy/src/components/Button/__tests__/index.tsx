import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Button, ButtonGroup, ButtonProps } from '../index'
import toJson from 'enzyme-to-json'

const props: ButtonProps = {
  type: 'submit',
  variant: 'primary',
  disabled: false,
  loading: false,
  fullWidth: false,
  dataTest: 'some-selector',
  onClick: jest.fn(),
}

describe('Button', () => {
  it('should match a snapshot', () => {
    expect(toJson(render(<Button {...props}>button text</Button>))).toMatchSnapshot()
  })

  it('should fire a click event correctly', () => {
    const wrapper = render(<Button {...props}>button text</Button>)
    wrapper.find('button').first().simulate('click')

    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('ButtonGroup', () => {
  it('should match a snapshot', () => {
    expect(
      toJson(
        render(
          <ButtonGroup>
            <Button {...props}>button text</Button>
            <Button {...props}>button text</Button>
          </ButtonGroup>,
        ),
      ),
    ).toMatchSnapshot()
  })
})
