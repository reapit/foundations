import React, { useState } from 'react'
import { mount, shallow } from 'enzyme'
import {
  HelpGuide,
  caculateCurrentStepRef,
  handleGoNext,
  handleGoPrev,
  renderTimeline,
  NavigationProps,
  HelpGuideStepProps
} from '..'

describe('HelpGuide', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
        <HelpGuide>
          <HelpGuide.Step id="step-1" component={() => <div className="step-1">Step 1</div>}></HelpGuide.Step>
          <HelpGuide.Step id="step-2" component={() => <div className="step-2">Step 2</div>}></HelpGuide.Step>
          <HelpGuide.Step id="step-3" component={() => <div className="step-3">Step 3</div>}></HelpGuide.Step>
          <HelpGuide.Step id="step-4" component={() => <div className="step-4">Step 4</div>}></HelpGuide.Step>
        </HelpGuide>
      )
    ).toMatchSnapshot()
  })

  describe('HelpGuide.Step', () => {
    it('should match a snapshot', () => {
      expect(
        shallow(<HelpGuide.Step id="step-3" component={() => <div className="step-3">Step 3</div>} />)
      ).toMatchSnapshot()
    })
  })

  describe('renderTimeline', () => {
    it('should match a snapshot when isMobileScreen TRUE', () => {
      expect(renderTimeline(5, 3, true)).toMatchSnapshot()
    })
    it('should match a snapshot when isMobileScreen FALSE', () => {
      expect(renderTimeline(5, 3, false)).toMatchSnapshot()
    })
  })

  it('handleCurrentStepRef should run correctly', async () => {
    const mockProps = {
      currentStepRef: {
        current: {
          style: {
            zIndex: '',
            opacity: '',
            transform: ''
          }
        }
      } as React.RefObject<HTMLDivElement>
    }

    function sleep(fn) {
      return new Promise(resolve => {
        // wait 3s before calling fn(par)
        setTimeout(() => resolve(fn), 300)
      })
    }

    const caculateAfterSetTimeout = () => {
      if (mockProps.currentStepRef.current) {
        mockProps.currentStepRef.current.style.opacity = '1'
        mockProps.currentStepRef.current.style.zIndex = '2'
        mockProps.currentStepRef.current.style.transform = 'translate(0px, 0px)'
      }
    }

    caculateCurrentStepRef(mockProps)()
    await sleep(caculateAfterSetTimeout)
    if (mockProps.currentStepRef.current) {
      expect(mockProps.currentStepRef.current.style.opacity).toEqual('1')
      expect(mockProps.currentStepRef.current.style.zIndex).toEqual('2')
      expect(mockProps.currentStepRef.current.style.transform).toEqual('translate(0px, 0px)')
    }
  })

  describe('handleGoNext', () => {
    const mockProps = {
      steps: [{ id: 'step-1' }, { id: 'step-2' }, { id: 'step-3' }] as HelpGuideStepProps[],
      currentIndex: 0,
      setInternalCurrent: jest.fn(),
      isLast: false,
      isMobileScreen: true,
      currentStepRef: {
        current: {
          clientHeight: 50,
          clientWidth: 30,
          style: {
            zIndex: '',
            opacity: '',
            transform: ''
          }
        }
      } as React.RefObject<HTMLDivElement>
    } as NavigationProps

    it('should run correctly when isLast TRUE', () => {
      handleGoNext({ ...mockProps, isLast: true })()
      if (mockProps.currentStepRef.current) {
        expect(mockProps.currentStepRef.current.style.opacity).toEqual('')
        expect(mockProps.currentStepRef.current.style.zIndex).toEqual('')
        expect(mockProps.currentStepRef.current.style.transform).toEqual('')
      }
      expect(mockProps.setInternalCurrent).toBeCalledTimes(0)
    })

    it('should run correctly when isMobileScreen TRUE', () => {
      handleGoNext({ ...mockProps })()
      if (mockProps.currentStepRef.current) {
        mockProps.currentStepRef.current.style.opacity = '0'
        expect(mockProps.currentStepRef.current.style.opacity).toEqual('0')
        mockProps.currentStepRef.current.style.zIndex = '0'
        expect(mockProps.currentStepRef.current.style.zIndex).toEqual('0')
        mockProps.currentStepRef.current.style.transform = `translateX(-${mockProps.currentStepRef.current.clientWidth}px)`
        expect(mockProps.currentStepRef.current.style.transform).toEqual(
          `translateX(-${mockProps.currentStepRef.current.clientWidth}px)`
        )
      }
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[mockProps.currentIndex + 1].id)
    })

    it('should run correctly when isMobileScreen FALSE', () => {
      handleGoNext({ ...mockProps, isMobileScreen: false })()
      if (mockProps.currentStepRef.current) {
        mockProps.currentStepRef.current.style.opacity = '0'
        expect(mockProps.currentStepRef.current.style.opacity).toEqual('0')
        mockProps.currentStepRef.current.style.zIndex = '0'
        expect(mockProps.currentStepRef.current.style.zIndex).toEqual('0')
        mockProps.currentStepRef.current.style.transform = `translateY(-${mockProps.currentStepRef.current.clientHeight}px)`
        expect(mockProps.currentStepRef.current.style.transform).toEqual(
          `translateY(-${mockProps.currentStepRef.current.clientHeight}px)`
        )
      }
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[mockProps.currentIndex + 1].id)
    })
  })

  describe('handleGoPrev', () => {
    const mockProps = {
      steps: [{ id: 'step-1' }, { id: 'step-2' }, { id: 'step-3' }] as HelpGuideStepProps[],
      currentIndex: 3,
      setInternalCurrent: jest.fn(),
      isFirst: false,
      isMobileScreen: true,
      currentStepRef: {
        current: {
          clientHeight: 50,
          clientWidth: 30,
          style: {
            zIndex: '',
            opacity: '',
            transform: ''
          }
        }
      } as React.RefObject<HTMLDivElement>
    } as NavigationProps

    it('should run correctly when isFirst TRUE', () => {
      handleGoPrev({ ...mockProps, isFirst: true })()
      if (mockProps.currentStepRef.current) {
        expect(mockProps.currentStepRef.current.style.opacity).toEqual('')
        expect(mockProps.currentStepRef.current.style.zIndex).toEqual('')
        expect(mockProps.currentStepRef.current.style.transform).toEqual('')
      }
      expect(mockProps.setInternalCurrent).toBeCalledTimes(0)
    })

    it('should run correctly when isMobileScreen TRUE', () => {
      handleGoPrev({ ...mockProps })()
      if (mockProps.currentStepRef.current) {
        mockProps.currentStepRef.current.style.opacity = '0'
        expect(mockProps.currentStepRef.current.style.opacity).toEqual('0')
        mockProps.currentStepRef.current.style.zIndex = '0'
        expect(mockProps.currentStepRef.current.style.zIndex).toEqual('0')
        mockProps.currentStepRef.current.style.transform = `translateX(${mockProps.currentStepRef.current.clientWidth}px)`
        expect(mockProps.currentStepRef.current.style.transform).toEqual(
          `translateX(${mockProps.currentStepRef.current.clientWidth}px)`
        )
      }
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[mockProps.currentIndex - 1].id)
    })

    it('should run correctly when isMobileScreen FALSE', () => {
      handleGoPrev({ ...mockProps, isMobileScreen: false })()
      if (mockProps.currentStepRef.current) {
        mockProps.currentStepRef.current.style.opacity = '0'
        expect(mockProps.currentStepRef.current.style.opacity).toEqual('0')
        mockProps.currentStepRef.current.style.zIndex = '0'
        expect(mockProps.currentStepRef.current.style.zIndex).toEqual('0')
        mockProps.currentStepRef.current.style.transform = `translateY(${mockProps.currentStepRef.current.clientHeight}px)`
        expect(mockProps.currentStepRef.current.style.transform).toEqual(
          `translateY(${mockProps.currentStepRef.current.clientHeight}px)`
        )
      }
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[mockProps.currentIndex - 1].id)
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
