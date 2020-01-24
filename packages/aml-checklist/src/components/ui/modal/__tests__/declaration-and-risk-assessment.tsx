import React from 'react'
import { shallow } from 'enzyme'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import {
  DeclarationAndRiskAssessment,
  renderForm,
  mapStateToProps,
  mapDispatchToProps,
} from '../declaration-and-risk-assessment'

describe('DeclarationAndRiskAssessment', () => {
  it('should match snapshot', () => {
    const mockProps = {
      isSubmitting: false,
      contact,
      onNextHandler: jest.fn(),
      onPrevHandler: jest.fn(),
      onHandleSubmit: jest.fn(),
    }
    const wrapper = shallow(<DeclarationAndRiskAssessment {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renderForm', () => {
    const mockProps = {
      primaryAddress: contact.primaryAddress,
      secondaryAddress: contact.secondaryAddress,
      isShowMoreThreeYearInput: true,
      setShowMoreThreeYearInput: jest.fn(),
      loading: false,
      onNextHandler: jest.fn(),
      onPrevHandler: jest.fn(),
      isSubmitting: false,
    }
    const fn = renderForm(mockProps)
    const component = fn({ values: {} })
    expect(component).toBeDefined()
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
