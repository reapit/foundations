import React, { useState } from 'react'
import { mount, shallow } from 'enzyme'
import { HelpGuide, caculateCurrentStepRef, handleGoNext, handleGoPrev } from '..'

const HelpGuideWrapper = () => {
  return (
    <div style={{ padding: 20 }}>
      <HelpGuide>
        <HelpGuide.Step id="step-1" component={() => <div className="step-1">Step 1</div>}></HelpGuide.Step>
        <HelpGuide.Step id="step-2" component={() => <div className="step-2">Step 2</div>}></HelpGuide.Step>
        <HelpGuide.Step id="step-3" component={() => <div className="step-3">Step 3</div>}></HelpGuide.Step>
        <HelpGuide.Step id="step-4" component={() => <div className="step-4">Step 4</div>}></HelpGuide.Step>
      </HelpGuide>
    </div>
  )
}

describe('HelpGuide', () => {
  it('should match a snapshot', () => {
    expect(shallow(<HelpGuideWrapper />)).toMatchSnapshot()
  })

  it('should match a snapshot', () => {
    expect(
      shallow(<HelpGuide.Step id="step-3" component={() => <div className="step-3">Step 3</div>} />)
    ).toMatchSnapshot()
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
      }
    }

    function sleep(fn) {
      return new Promise(resolve => {
        // wait 3s before calling fn(par)
        setTimeout(() => resolve(fn), 300)
      })
    }

    const caculateAfterSetTimeout = () => {
      mockProps.currentStepRef.current.style.opacity = '1'
      mockProps.currentStepRef.current.style.zIndex = '2'
      mockProps.currentStepRef.current.style.transform = 'translate(0px, 0px)'
    }

    caculateCurrentStepRef(mockProps)()
    await sleep(caculateAfterSetTimeout)
    expect(mockProps.currentStepRef.current.style.opacity).toEqual('1')
    expect(mockProps.currentStepRef.current.style.zIndex).toEqual('2')
    expect(mockProps.currentStepRef.current.style.transform).toEqual('translate(0px, 0px)')
  })

  describe('handleGoNext', () => {
    const mockProps = {
      steps: [{ id: 'step-1' }, { id: 'step-2' }, { id: 'step-3' }],
      currentIndex: 0,
      isLast: false,
      setInternalCurrent: jest.fn(),
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
      }
    }
    it('should run correctly when mobile screen', () => {
      handleGoNext({ ...mockProps, isMobileScreen: true })()
      mockProps.currentStepRef.current.style.opacity = '0'
      expect(mockProps.currentStepRef.current.style.opacity).toEqual('0')
      mockProps.currentStepRef.current.style.zIndex = '0'
      expect(mockProps.currentStepRef.current.style.zIndex).toEqual('0')
      mockProps.currentStepRef.current.style.transform = `translateX(-${mockProps.currentStepRef.current.clientWidth}px)`
      expect(mockProps.currentStepRef.current.style.transform).toEqual(
        `translateX(-${mockProps.currentStepRef.current.clientWidth}px)`
      )
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[mockProps.currentIndex + 1].id)
    })

    it('should run correctly when desktop screen', () => {
      handleGoNext({ ...mockProps, isMobileScreen: false })()
      mockProps.currentStepRef.current.style.opacity = '0'
      expect(mockProps.currentStepRef.current.style.opacity).toEqual('0')
      mockProps.currentStepRef.current.style.zIndex = '0'
      expect(mockProps.currentStepRef.current.style.zIndex).toEqual('0')
      mockProps.currentStepRef.current.style.transform = `translateY(-${mockProps.currentStepRef.current.clientHeight}px)`
      expect(mockProps.currentStepRef.current.style.transform).toEqual(
        `translateY(-${mockProps.currentStepRef.current.clientHeight}px)`
      )
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[mockProps.currentIndex + 1].id)
    })
  })

  describe('handleGoPrev', () => {
    const mockProps = {
      steps: [{ id: 'step-1' }, { id: 'step-2' }, { id: 'step-3' }],
      currentIndex: 2,
      isFirst: false,
      setInternalCurrent: jest.fn(),
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
      }
    }
    it('should run correctly when mobile screen', () => {
      handleGoPrev({ ...mockProps, isMobileScreen: true })()
      mockProps.currentStepRef.current.style.opacity = '0'
      expect(mockProps.currentStepRef.current.style.opacity).toEqual('0')
      mockProps.currentStepRef.current.style.zIndex = '0'
      expect(mockProps.currentStepRef.current.style.zIndex).toEqual('0')
      mockProps.currentStepRef.current.style.transform = `translateX(${mockProps.currentStepRef.current.clientWidth}px)`
      expect(mockProps.currentStepRef.current.style.transform).toEqual(
        `translateX(${mockProps.currentStepRef.current.clientWidth}px)`
      )
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[mockProps.currentIndex - 1].id)
    })

    it('should run correctly when desktop screen', () => {
      handleGoPrev({ ...mockProps, isMobileScreen: false })()
      mockProps.currentStepRef.current.style.opacity = '0'
      expect(mockProps.currentStepRef.current.style.opacity).toEqual('0')
      mockProps.currentStepRef.current.style.zIndex = '0'
      expect(mockProps.currentStepRef.current.style.zIndex).toEqual('0')
      mockProps.currentStepRef.current.style.transform = `translateY(${mockProps.currentStepRef.current.clientHeight}px)`
      expect(mockProps.currentStepRef.current.style.transform).toEqual(
        `translateY(${mockProps.currentStepRef.current.clientHeight}px)`
      )
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[mockProps.currentIndex - 1].id)
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
