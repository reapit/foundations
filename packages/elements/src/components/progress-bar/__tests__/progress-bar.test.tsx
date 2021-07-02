import React from 'react'
import { mount } from 'enzyme'
import {
  ProgressBarPercentage,
  ProgressBarSteps,
  ProgressBarContainer,
  ProgressBarInner,
  ProgressBarItem,
  handleSetPercentageComplete,
  handleSetPercentageCompleteSteps,
} from '../progress-bar'

describe('ProgressBarContainer', () => {
  it('should match a snapshot', () => {
    const wrapper = mount(<ProgressBarContainer />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ProgressBarInner', () => {
  it('should match a snapshot', () => {
    const wrapper = mount(<ProgressBarInner />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ProgressBarItem', () => {
  it('should match a snapshot', () => {
    const wrapper = mount(<ProgressBarItem />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ProgressBarPercentage', () => {
  it('should match a snapshot', () => {
    const wrapper = mount(<ProgressBarPercentage duration={20} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ProgressBarSteps', () => {
  it('should match a snapshot', () => {
    const wrapper = mount(<ProgressBarSteps numberSteps={10} currentStep={5} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleSetPercentageComplete', () => {
  it('should call window set interval and clear interval', () => {
    const intervalSpy = jest.spyOn(window, 'setInterval')
    const clearSpy = jest.spyOn(window, 'clearInterval')
    const mockSetPercentComplete = jest.fn()
    const mockIntervalTime = 20

    const curried = handleSetPercentageComplete(mockSetPercentComplete, mockIntervalTime)
    const interval = curried()

    expect(intervalSpy).toHaveBeenCalledTimes(1)

    interval()

    expect(clearSpy).toHaveBeenCalledTimes(1)
  })
})

describe('handleSetPercentageCompleteSteps', () => {
  it('should call setPercentageComplete with correct time', () => {
    const mockSetPercentComplete = jest.fn()
    const mockNumberSteps = 20
    const mockCurrentStep = 20

    const curried = handleSetPercentageCompleteSteps(mockSetPercentComplete, mockCurrentStep, mockNumberSteps)

    curried()

    expect(mockSetPercentComplete).toHaveBeenCalledTimes(1)
    expect(mockSetPercentComplete).toHaveBeenCalledWith((mockCurrentStep / mockNumberSteps) * 100)
  })
})
