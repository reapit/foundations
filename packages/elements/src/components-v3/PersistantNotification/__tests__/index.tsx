import * as React from 'react'
import { shallow } from 'enzyme'
import { PersistantNotification } from '../'
import { elPnIcon } from '../__styles__'

describe('PersistantNotification component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<PersistantNotification>I am notification</PersistantNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when given an intent', () => {
    const wrapper = shallow(<PersistantNotification intent="critical">I am notification</PersistantNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when expanded', () => {
    const wrapper = shallow(<PersistantNotification isExpanded={true}>I am notification</PersistantNotification>)
    expect(wrapper).toMatchSnapshot()
  })

  it('should fire the onStepClick event correctly', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <PersistantNotification intent="critical" onExpansionToggle={spy}>
        I am notification
      </PersistantNotification>,
    )
    wrapper.find(`.${elPnIcon}`).first().simulate('click')
    expect(spy).toHaveBeenCalledTimes(1)
  })
})
