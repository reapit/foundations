import React from 'react'
import { shallow } from 'enzyme'
import { renderOptions, AgentCheck, renderForm, mapStateToProps, mapDispatchToProps } from '../agent-check'
import { idCheck } from '@/sagas/__stubs__/contact'
import { ReduxState } from '@/types/core'

describe('agent-check', () => {
  describe('renderOptions', () => {
    it('should run correctly', () => {
      const result = renderOptions(1, 2, 1)
      const expected = [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
      ]
      expect(result).toEqual(expected)
    })
  })

  describe('AgentCheck', () => {
    it('should match snapshot', () => {
      const mockProps = {
        id: '1',
        isSubmitting: true,
        onPrevHandler: jest.fn(),
        onHandleSubmit: jest.fn(),
        idCheck,
        isDisabledSubmit: false,
      }
      const wrapper = shallow(<AgentCheck {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderForm', () => {
    it('should match snapshot', () => {
      const mockProps = {
        id: '1',
        isSubmitting: true,
        onPrevHandler: jest.fn(),
        isDisabledSubmit: true,
      }
      const component = renderForm(mockProps)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('mapStateToProps', () => {
    it('should map correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          isSubmitting: true,
          checklistDetailData: {
            idCheck,
          },
        },
      } as ReduxState
      const expected = {
        isSubmitting: true,
        isDisabledSubmit: false,
        idCheck,
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should map correctly', () => {
      const mockState = {
        checklistDetail: {
          isSubmitting: true,
          checklistDetailData: {
            idCheck,
          },
        },
      } as any
      const expected = {
        isSubmitting: true,
        isDisabledSubmit: false,
        idCheck,
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when involked onPrevHandler', () => {
      const mockDispatch = jest.fn()
      const { onHandleSubmit } = mapDispatchToProps(mockDispatch)
      onHandleSubmit && onHandleSubmit({})
      expect(mockDispatch).toBeCalled()
    })
  })
})
