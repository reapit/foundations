import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { PersistentNotification } from '..'

describe('PersistentNotification component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PersistentNotification>I am notification</PersistentNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when given an intent', () => {
    const wrapper = render(<PersistentNotification intent="primary">I am notification</PersistentNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when expanded', () => {
    const wrapper = render(<PersistentNotification isExpanded={true}>I am notification</PersistentNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should fire the onStepClick event correctly', async () => {
    const spy = jest.fn()
    const wrapper = render(
      <PersistentNotification intent="primary" onExpansionToggle={spy}>
        I am notification
      </PersistentNotification>,
    )
    fireEvent.click(wrapper.getByTestId('close-icon'))
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should match a snapshot for an inline notification', () => {
    const wrapper = render(
      <PersistentNotification isExpanded isInline isFullWidth intent="primary">
        I am notification
      </PersistentNotification>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
