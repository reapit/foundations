import React from 'react'
import { shallow } from 'enzyme'
import { Button, ButtonGroup } from '../button'

describe('Button', () => {
  it('should match snapshot - primary variant', () => {
    const wrapper = shallow(<Button variant="primary">text</Button>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot - secondary variant', () => {
    const wrapper = shallow(<Button variant="secondary">text</Button>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot - info variant', () => {
    const wrapper = shallow(<Button variant="info">text</Button>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot - danger variant', () => {
    const wrapper = shallow(<Button variant="danger">text</Button>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot - disabled', () => {
    const wrapper = shallow(
      <Button variant="primary" disabled>
        text
      </Button>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot - loading', () => {
    const wrapper = shallow(
      <Button variant="primary" isLoading>
        text
      </Button>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot - fullWidth', () => {
    const wrapper = shallow(
      <Button variant="primary" isFullWidth>
        text
      </Button>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ButtonGroup', () => {
  it('should match snapshot - default', () => {
    const wrapper = shallow(
      <ButtonGroup>
        <Button>text</Button>
        <Button>text</Button>
        <Button>text</Button>
      </ButtonGroup>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot - centered', () => {
    const wrapper = shallow(
      <ButtonGroup isCentered>
        <Button>text</Button>
        <Button>text</Button>
        <Button>text</Button>
      </ButtonGroup>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
