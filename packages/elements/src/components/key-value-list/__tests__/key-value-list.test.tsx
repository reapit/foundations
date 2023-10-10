import React from 'react'
import { render } from '@testing-library/react'
import { KeyValueList } from '..'

describe('KeyValueList component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <KeyValueList
        items={[
          {
            key: 'Name',
            value: 'John Doe',
            iconName: 'usernameSystem',
            intent: 'primary',
          },
          {
            key: 'Email',
            value: 'email@example.com',
            iconName: 'emailSystem',
            intent: 'primary',
          },
          {
            key: 'Address',
            value: '1234 Main St, Foo, Bar, 12345',
            iconName: 'homeSystem',
            intent: 'primary',
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for a large grid', () => {
    const wrapper = render(
      <KeyValueList
        hasLargeGrid
        items={[
          {
            key: 'Name',
            value: 'John Doe',
            iconName: 'usernameSystem',
            intent: 'primary',
          },
          {
            key: 'Email',
            value: 'email@example.com',
            iconName: 'emailSystem',
            intent: 'primary',
          },
          {
            key: 'Address',
            value: '1234 Main St, Foo, Bar, 12345',
            iconName: 'homeSystem',
            intent: 'primary',
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot for a small grid', () => {
    const wrapper = render(
      <KeyValueList
        hasSmallGrid
        items={[
          {
            key: 'Name',
            value: 'John Doe',
            iconName: 'usernameSystem',
            intent: 'primary',
          },
          {
            key: 'Email',
            value: 'email@example.com',
            iconName: 'emailSystem',
            intent: 'primary',
          },
          {
            key: 'Address',
            value: '1234 Main St, Foo, Bar, 12345',
            iconName: 'homeSystem',
            intent: 'primary',
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
