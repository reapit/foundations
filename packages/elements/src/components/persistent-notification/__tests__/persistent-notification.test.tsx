import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/dom'
import { PersistentNotification } from '..'

describe('PersistentNotification component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<PersistentNotification>I am notification</PersistentNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when given an intent', () => {
    const wrapper = render(<PersistentNotification intent="critical">I am notification</PersistentNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when expanded', () => {
    const wrapper = render(<PersistentNotification isExpanded={true}>I am notification</PersistentNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should fire the onStepClick event correctly', async () => {
    const spy = jest.fn()
    const user = userEvent.setup()
    render(
      <PersistentNotification intent="critical" onExpansionToggle={spy}>
        I am notification
      </PersistentNotification>,
    )
    await user.click(screen.getByTestId('close-icon'))
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
