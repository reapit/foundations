import React from 'react'
import { render } from '../../../tests/react-testing'
import { PersistantNotification } from '..'
import { elPnIcon } from '../__styles__'

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

  it('should fire the onStepClick event correctly', () => {
    const spy = jest.fn()
    const wrapper = render(
      <PersistantNotification intent="critical" onExpansionToggle={spy}>
        I am notification
      </PersistantNotification>,
    )
    wrapper.find(`.${elPnIcon}`).first().simulate('click')
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
