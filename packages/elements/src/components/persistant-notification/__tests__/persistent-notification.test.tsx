import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/dom'
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
    const user = userEvent.setup()
    render(
      <PersistantNotification intent="critical" onExpansionToggle={spy}>
        I am notification
      </PersistantNotification>,
    )
    await user.click(screen.getByTestId('close-icon'))
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
