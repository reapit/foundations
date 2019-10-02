import React from 'react'
import { shallow } from 'enzyme'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import {
  DeclarationAndRiskAssessment,
  renderForm,
  mapStateToProps,
  mapDispatchToProps
} from '../declaration-and-risk-assessment'

describe('DeclarationAndRiskAssessment', () => {
  it('should match snapshot', () => {
    const mockProps = {
      contact,
      onNextHandler: jest.fn(),
      onPrevHandler: jest.fn(),
      onHandleSubmit: jest.fn()
    }
    const wrapper = shallow(<DeclarationAndRiskAssessment {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('renderForm', () => {
    const mockProps = {
      address: contact.addresses,
      isShowMoreThreeYearInput: true,
      setShowMoreThreeYearInput: jest.fn(),
      loading: false,
      onNextHandler: jest.fn(),
      onPrevHandler: jest.fn()
    }
    const fn = renderForm(mockProps)
    const component = fn()
    expect(component).toBeDefined()
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          checklistDetailData: {
            contact
          }
        }
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact: {}
      })
    })
  })

  describe('mapDispatchToProps', () => {
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const mockOwnProps = {
        id: '1'
      }
      const { onNextHandler } = mapDispatchToProps(mockDispatch, mockOwnProps)
      onNextHandler()
      expect(mockDispatch).toBeCalled()
    })
    it('should render correctly', () => {
      const mockDispatch = jest.fn()
      const mockOwnProps = {
        id: '1'
      }
      const { onPrevHandler } = mapDispatchToProps(mockDispatch, mockOwnProps)
      onPrevHandler()
      expect(mockDispatch).toBeCalled()
    })
  })
})
