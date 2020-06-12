import React from 'react'
import { shallow } from 'enzyme'
import { Profile, renderForm, mapStateToProps, mapDispatchToProps } from '../profile'
import { contact } from '@/sagas/__stubs__/contact'
import { ReduxState } from '@/types/core'

describe('profile', () => {
  describe('renderForm', () => {
    it('should match snapshot', () => {
      const mockOnNextHandler = jest.fn()
      const mockIsSubmitting = false
      const component = renderForm({ contact, onNextHandler: mockOnNextHandler, isSubmitting: mockIsSubmitting })({
        values: {},
      })
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderForm', () => {
    it('should match snapshot', () => {
      const mockOnNextHandler = jest.fn()
      const mockIsSubmitting = false
      const component = renderForm({ contact, onNextHandler: mockOnNextHandler, isSubmitting: mockIsSubmitting })({
        values: {},
      })
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('Profile', () => {
    const mockProps = {
      contact: contact,
      onNextHandler: jest.fn(),
      onSubmitHandler: jest.fn(),
      isSubmitting: false,
    }
    const wrapper = shallow(<Profile {...mockProps} />)
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
        contact,
        isSubmitting: false,
      })
    })
    it('should run correctly', () => {
      const mockState = {} as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        contact: {},
        isSubmitting: false,
      })
    })
  })
  describe('mapDispatchToProps', () => {
    it('should run correctly onNextHandler', () => {
      const mockDispatch = jest.fn()
      const { onNextHandler } = mapDispatchToProps(mockDispatch)
      onNextHandler({})()
      expect(mockDispatch).toBeCalled()
    })
    it('should run correctly onSubmitHandler', () => {
      const mockDispatch = jest.fn()
      const { onSubmitHandler } = mapDispatchToProps(mockDispatch)
      onSubmitHandler({})
      expect(mockDispatch).toBeCalled()
    })
  })
})
