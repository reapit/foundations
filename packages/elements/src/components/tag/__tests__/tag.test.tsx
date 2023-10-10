import React from 'react'
import { render } from '@testing-library/react'
import { Tag, TagGroup } from '..'

describe('Tag component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Tag>Some Content</Tag>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Tag intent="primary">Some Content</Tag>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Tag intent="neutral">Some Content</Tag>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Tag intent="danger">Some Content</Tag>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Tag intent="success">Some Content</Tag>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Tag intent="warning">Some Content</Tag>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Tag intent="pending">Some Content</Tag>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for intent', () => {
    const wrapper = render(<Tag intent="default">Some Content</Tag>)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('TagGroup component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <TagGroup>
        <Tag intent="default">Some Content</Tag>
        <Tag intent="primary">Some Content</Tag>
      </TagGroup>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
