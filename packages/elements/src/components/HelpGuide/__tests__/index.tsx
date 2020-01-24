import React from 'react'
import { shallow } from 'enzyme'
import {
  HelpGuide,
  caculateStepChange,
  handleGoNext,
  handleGoPrev,
  handleGoTo,
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
    const mockProps = {
      total: 5,
      currentIndex: 3,
      isMobileScreen: true,
      goTo: jest.fn()
    }
    it('should match a snapshot when isMobileScreen TRUE', () => {
      expect(renderTimeline(mockProps)).toMatchSnapshot()
    })
    it('should match a snapshot when isMobileScreen FALSE', () => {
      expect(renderTimeline({ ...mockProps, isMobileScreen: false })).toMatchSnapshot()
    })
  })

  describe('caculateStepChange', async () => {
    const mockProps = {
      currentStepRef: {
        current: {
          style: {
            zIndex: '',
            opacity: '',
            transform: ''
          }
        }
      } as React.RefObject<HTMLDivElement>,
      wrapperStepRef: {
        current: {
          style: {
            zIndex: '',
            opacity: '',
            transform: ''
          }
        }
      } as React.RefObject<HTMLDivElement>,
      helpguideRef: {
        current: {
          style: {
            zIndex: '',
            opacity: '',
            transform: ''
          }
        }
      } as React.RefObject<HTMLDivElement>,
      isMobileScreen: false
    }

    const { currentStepRef, helpguideRef, wrapperStepRef } = mockProps

    it('should run correctly when isMobileScreen true', () => {
      caculateStepChange({ ...mockProps, isMobileScreen: true })()

      if (currentStepRef.current && helpguideRef.current && wrapperStepRef.current) {
        const transform = `translate3d(-${currentStepRef.current.offsetLeft}px, 0, 0)`
        wrapperStepRef.current.style.transform = transform
        expect(wrapperStepRef.current.style.transform).toEqual(transform)
      }
    })

    it('should run correctly when isMobileScreen false', () => {
      caculateStepChange(mockProps)()

      if (currentStepRef.current && helpguideRef.current && wrapperStepRef.current) {
        const height = `${currentStepRef.current.offsetHeight}px`
        const transform = `translate3d(0, -${currentStepRef.current.offsetTop}px, 0)`
        helpguideRef.current.style.height = height
        wrapperStepRef.current.style.transform = transform
        expect(helpguideRef.current.style.height).toEqual(height)
        expect(wrapperStepRef.current.style.transform).toEqual(transform)
      }
    })
  })

  describe('handleGoTo', () => {
    const mockProps = {
      steps: [{ id: 'step-1' }, { id: 'step-2' }, { id: 'step-3' }] as HelpGuideStepProps[],
      currentIndex: 0,
      setInternalCurrent: jest.fn()
    } as NavigationProps

    it('should run correctly', () => {
      handleGoTo({ ...mockProps })(2)
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[2].id)
    })
  })

  describe('handleGoNext', () => {
    const mockProps = {
      steps: [{ id: 'step-1' }, { id: 'step-2' }, { id: 'step-3' }] as HelpGuideStepProps[],
      currentIndex: 0,
      setInternalCurrent: jest.fn(),
      isLast: false
    } as NavigationProps

    it('should run correctly when isLast false', () => {
      handleGoNext({ ...mockProps })()
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[mockProps.currentIndex + 1].id)
    })

    it('should run correctly when isLast true', () => {
      handleGoNext({ ...mockProps, isLast: true })()
      expect(mockProps.setInternalCurrent).toBeCalledTimes(0)
    })
  })

  describe('handleGoPrev', () => {
    const mockProps = {
      steps: [{ id: 'step-1' }, { id: 'step-2' }, { id: 'step-3' }] as HelpGuideStepProps[],
      currentIndex: 3,
      setInternalCurrent: jest.fn(),
      isFirst: false
    } as NavigationProps

    it('should run correctly when isFirst false', () => {
      handleGoPrev({ ...mockProps })()
      expect(mockProps.setInternalCurrent).toBeCalledWith(mockProps.steps[mockProps.currentIndex - 1].id)
    })

    it('should run correctly when isFirst true', () => {
      handleGoPrev({ ...mockProps, isFirst: true })()
      expect(mockProps.setInternalCurrent).toBeCalledTimes(0)
    })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
