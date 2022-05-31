import * as React from 'react'
import { render } from '@testing-library/react'
import { Button, ButtonGroup, ButtonProps } from '../index'

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
    expect(render(<Button {...props}>button text</Button>)).toMatchSnapshot()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('ButtonGroup', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <ButtonGroup>
          <Button {...props}>button text</Button>
          <Button {...props}>button text</Button>
        </ButtonGroup>,
      ),
    ).toMatchSnapshot()
  })
})
