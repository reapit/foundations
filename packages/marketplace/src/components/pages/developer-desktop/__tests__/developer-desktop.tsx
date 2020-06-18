import * as React from 'react'
import { shallow } from 'enzyme'
import {
  DeveloperDesktopPage,
  submitSubscription,
  handleToggleVisibleModal,
  handleCloseDeveloperConfirmSubscriptionModal,
} from '../developer-desktop'

describe('DeveloperDesktopPage', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<DeveloperDesktopPage />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleToggleVisibleModal', () => {
  it('should run correctly', () => {
    const setIsDeveloperEditionModalOpen = jest.fn()
    const isVisible = false
    handleToggleVisibleModal(setIsDeveloperEditionModalOpen, isVisible)()
    expect(setIsDeveloperEditionModalOpen).toBeCalledWith(isVisible)
  })
})

describe('submitSubscription', () => {
  jest.useFakeTimers()

  it('should run correctly', () => {
    const setIsDeveloperEditionModalOpen = jest.fn()
    const setConfirmSubscriptionModalOpen = jest.fn()
    const setSelectedDevelopers = jest.fn()
    const values = []
    submitSubscription(setIsDeveloperEditionModalOpen, setConfirmSubscriptionModalOpen, setSelectedDevelopers)(values)
    jest.runAllTimers()

    expect(setIsDeveloperEditionModalOpen).toBeCalled()
    expect(setConfirmSubscriptionModalOpen).toBeCalled()
    expect(setSelectedDevelopers).toBeCalled()
    expect(setSelectedDevelopers).toBeCalledWith(values)
  })
})

describe('handleCloseDeveloperConfirmSubscriptionModal', () => {
  it('should run correctly', () => {
    const setConfirmSubscriptionModalOpen = jest.fn()
    const setSelectedDevelopers = jest.fn()
    handleCloseDeveloperConfirmSubscriptionModal(setConfirmSubscriptionModalOpen, setSelectedDevelopers)()
    expect(setConfirmSubscriptionModalOpen).toBeCalled()
    expect(setSelectedDevelopers).toBeCalled()
    expect(setSelectedDevelopers).toBeCalledWith([])
  })
})
