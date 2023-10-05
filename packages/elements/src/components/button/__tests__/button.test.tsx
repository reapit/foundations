import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Button, ButtonProps, FloatingButton, ButtonGroup, resolveButtonSize } from '../index'

const props: ButtonProps = {
  type: 'submit',
  intent: 'primary',
  disabled: false,
  loading: false,
  onClick: jest.fn(),
}

describe('Button', () => {
  it('should match a snapshot', () => {
    expect(render(<Button {...props}>button text</Button>)).toMatchSnapshot()
  })

  it('should match a snapshot with all modifiers', () => {
    const fullProps = {
      ...props,
      loading: true,
      disabled: true,
      chevronLeft: true,
      chevronRight: true,
      fixedWidth: true,
      className: 'some-class',
    }
    expect(render(<Button {...fullProps}>button text</Button>)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    expect(
      render(
        <FloatingButton icon="addSystem" {...props}>
          button text
        </FloatingButton>,
      ),
    ).toMatchSnapshot()
  })

  it('should fire a click event correctly', async () => {
    const wrapper = render(<Button {...props}>button text</Button>)

    fireEvent.click(wrapper.getByText('button text'))

    expect(props.onClick).toHaveBeenCalledTimes(1)
  })

  it('should not return button size class', () => {
    expect(resolveButtonSize(2)).toBe(undefined)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('ButtonGroup', () => {
  it('should match a snapshot for align left', () => {
    expect(
      render(
        <ButtonGroup alignment="left">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for align right', () => {
    expect(
      render(
        <ButtonGroup alignment="right">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot for align center', () => {
    expect(
      render(
        <ButtonGroup alignment="center">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>,
      ),
    ).toMatchSnapshot()
  })
})
