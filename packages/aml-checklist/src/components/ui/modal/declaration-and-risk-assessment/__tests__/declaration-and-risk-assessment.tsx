import React from 'react'
import { render } from '../../../tests/react-testing'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import { DeclarationAndRiskAssessment, mapStateToProps, mapDispatchToProps } from '../declaration-and-risk-assessment'

describe('DeclarationAndRiskAssessment', () => {
  it('should match snapshot', () => {
    const mockProps = {
      isSubmitting: false,
      contact,
      onNextHandler: jest.fn(),
      onPrevHandler: jest.fn(),
      onHandleSubmit: jest.fn(),
    }
    const wrapper = render(<DeclarationAndRiskAssessment {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          checklistDetailData: {
            contact,
          },
        },
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        isSubmitting: false,
        contact,
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        isSubmitting: false,
        contact: {},
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { onNextHandler } = mapDispatchToProps(mockDispatch)
      onNextHandler({})()
      expect(mockDispatch).toBeCalled()
    })
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const { onPrevHandler } = mapDispatchToProps(mockDispatch)
      onPrevHandler()
      expect(mockDispatch).toBeCalled()
    })
  })
})
