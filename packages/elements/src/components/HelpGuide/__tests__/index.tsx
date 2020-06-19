import React from 'react'
import { shallow } from 'enzyme'
import { HelpGuide, handleGoNext, handleGoPrev, handleGoTo, renderTimeline, NavigationProps } from '..'

describe('HelpGuide', () => {
  it('should match a snapshot', () => {
    expect(
      shallow(
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
        shallow(<HelpGuide.Step id="step-3" component={() => <div className="step-3">Step 3</div>} />),
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
    } as NavigationProps
    it('should run correctly', () => {
      handleGoTo({ ...mockProps })(2)
      expect(mockProps.setCurrentStep).toBeCalledWith(2)
    })
  })

  describe('handleGoNext', () => {
    const mockProps = {
      isLast: false,
      setCurrentStep: jest.fn(),
      currentStep: 0,
    } as NavigationProps

    it('should run correctly when isLast false', () => {
      handleGoNext({ ...mockProps })()
      expect(mockProps.setCurrentStep).toBeCalledWith((mockProps.currentStep as number) + 1)
    })

    it('should run correctly when isLast true', () => {
      const mockProps = {
        isLast: true,
        setCurrentStep: jest.fn(),
        currentStep: 0,
      } as NavigationProps

      handleGoNext({ ...mockProps, isLast: true })()
      expect(mockProps.setCurrentStep).not.toBeCalled()
    })
  })

  describe('handleGoPrev', () => {
    const mockProps = {
      isFirst: false,
      setCurrentStep: jest.fn(),
      currentStep: 3,
    } as NavigationProps

    it('should run correctly when isFirst false', () => {
      handleGoPrev({ ...mockProps })()
      expect(mockProps.setCurrentStep).toBeCalledWith((mockProps.currentStep as number) - 1)
    })

    it('should run correctly when isFirst true', () => {
      const mockProps = {
        isFirst: true,
        setCurrentStep: jest.fn(),
        currentStep: 0,
      } as NavigationProps
      handleGoPrev({ ...mockProps, isFirst: true })()
      expect(mockProps.setCurrentStep).not.toBeCalled()
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
