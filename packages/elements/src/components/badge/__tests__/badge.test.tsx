import React from 'react'
import { render } from '@testing-library/react'
import { Badge, BadgeGroup } from '..'

describe('Badge component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Badge>50%</Badge>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Badge intent="primary">Some Content</Badge>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Badge intent="neutral">Some Content</Badge>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Badge intent="danger">Some Content</Badge>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Badge intent="success">Some Content</Badge>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Badge intent="warning">Some Content</Badge>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Badge intent="pending">Some Content</Badge>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Badge intent="default">Some Content</Badge>)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('BadgeGroup component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <BadgeGroup>
        <Badge intent="default">Some Content</Badge>
        <Badge intent="primary">Some Content</Badge>
      </BadgeGroup>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
