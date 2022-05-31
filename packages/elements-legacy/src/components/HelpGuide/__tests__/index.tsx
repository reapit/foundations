import React from 'react'
import { render } from '@testing-library/react'
import { HelpGuide, handleGoNext, handleGoPrev, handleGoTo, renderTimeline, NavigationProps } from '..'

describe('HelpGuide', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <HelpGuide>
          <HelpGuide.Step id="step-1" component={() => <div className="step-1">Step 1</div>}></HelpGuide.Step>
          <HelpGuide.Step id="step-2" component={() => <div className="step-2">Step 2</div>}></HelpGuide.Step>
          <HelpGuide.Step id="step-3" component={() => <div className="step-3">Step 3</div>}></HelpGuide.Step>
          <HelpGuide.Step id="step-4" component={() => <div className="step-4">Step 4</div>}></HelpGuide.Step>
        </HelpGuide>,
      ),
    ).toMatchSnapshot()
  })

  describe('HelpGuide.Step', () => {
    it('should match a snapshot', () => {
      expect(
        render(<HelpGuide.Step id="step-3" component={() => <div className="step-3">Step 3</div>} />),
      ).toMatchSnapshot()
    })
  })

  describe('renderTimeline', () => {
    const mockProps = {
      total: 5,
      currentStep: 3,
      isMobileScreen: true,
      goTo: jest.fn(),
    }
    it('should match a snapshot when isMobileScreen TRUE', () => {
      expect(renderTimeline(mockProps)).toMatchSnapshot()
    })
    it('should match a snapshot when isMobileScreen FALSE', () => {
      expect(renderTimeline({ ...mockProps, isMobileScreen: false })).toMatchSnapshot()
    })
  })

  describe('handleGoTo', () => {
    const mockProps = {
      isLast: false,
      setCurrentStep: jest.fn(),
      currentStep: 0,
      setIsExit: jest.fn(),
    } as NavigationProps
    it('should run correctly', (done) => {
      handleGoTo({ ...mockProps })(2)
      expect(mockProps.setIsExit).toBeCalledWith(true)
      setTimeout(() => {
        expect(mockProps.setCurrentStep).toBeCalledWith(2)
        done()
      }, 1000)
    })
  })

  describe('handleGoNext', () => {
    const mockProps = {
      isLast: false,
      setCurrentStep: jest.fn(),
      currentStep: 0,
      setIsExit: jest.fn(),
    } as NavigationProps

    it('should run correctly when isLast false', (done) => {
      handleGoNext({ ...mockProps })()
      expect(mockProps.setIsExit).toBeCalledWith(true)
      setTimeout(() => {
        expect(mockProps.setCurrentStep).toBeCalledWith((mockProps.currentStep as number) + 1)
        done()
      }, 1000)
    })

    it('should run correctly when isLast true', () => {
      const mockProps = {
        isLast: true,
        setCurrentStep: jest.fn(),
        currentStep: 0,
        setIsExit: jest.fn(),
      } as NavigationProps

      handleGoNext({ ...mockProps, isLast: true })()
      expect(mockProps.setCurrentStep).not.toBeCalled()
      expect(mockProps.setIsExit).not.toBeCalledWith(true)
    })
  })

  describe('handleGoPrev', () => {
    const mockProps = {
      isFirst: false,
      setCurrentStep: jest.fn(),
      currentStep: 3,
      setIsExit: jest.fn(),
    } as NavigationProps

    it('should run correctly when isFirst false', (done) => {
      handleGoPrev({ ...mockProps })()
      setTimeout(() => {
        expect(mockProps.setCurrentStep).toBeCalledWith((mockProps.currentStep as number) - 1)
        done()
      }, 1000)
      expect(mockProps.setIsExit).toBeCalledWith(true)
    })

    it('should run correctly when isFirst true', () => {
      const mockProps = {
        isFirst: true,
        setCurrentStep: jest.fn(),
        currentStep: 0,
        setIsExit: jest.fn(),
      } as NavigationProps
      handleGoPrev({ ...mockProps, isFirst: true })()
      expect(mockProps.setCurrentStep).not.toBeCalled()
      expect(mockProps.setIsExit).not.toBeCalledWith(true)
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
