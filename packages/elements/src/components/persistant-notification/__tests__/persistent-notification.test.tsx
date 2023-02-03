import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { PersistantNotification } from '..'

describe('PersistantNotification component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PersistantNotification>I am notification</PersistantNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when given an intent', () => {
    const wrapper = render(<PersistantNotification intent="critical">I am notification</PersistantNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when expanded', () => {
    const wrapper = render(<PersistantNotification isExpanded={true}>I am notification</PersistantNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should fire the onStepClick event correctly', async () => {
    const spy = jest.fn()
    const wrapper = render(
      <PersistantNotification intent="critical" onExpansionToggle={spy}>
        I am notification
      </PersistantNotification>,
    )
    fireEvent.click(wrapper.getByTestId('close-icon'))
    expect(spy).toHaveBeenCalledTimes(1)
  })

  it('should match a snapshot for an inline notification', () => {
    const wrapper = render(
      <PersistantNotification isExpanded isInline isFullWidth intent="primary">
        I am notification
      </PersistantNotification>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
