import React from 'react'
import { shallow } from 'enzyme'
import { renderOptions, AgentCheck, renderForm, mapStateToProps, mapDispatchToProps } from '../agent-check'
import { contact } from '@/sagas/__stubs__/contact'
import { ReduxState } from '@/types/core'

describe('agent-check', () => {
  describe('renderOptions', () => {
    it('should run correctly', () => {
      const result = renderOptions(1, 2, 1)
      const expected = [{ label: '1', value: '1' }, { label: '2', value: '2' }]
      expect(result).toEqual(expected)
    })
  })

  describe('AgentCheck', () => {
    it('should match snapshot', () => {
      const mockProps = {
        id: '1',
        isSubmitting: true,
        onPrevHandler: jest.fn(),
        onNextHandler: jest.fn()
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
        onNextHandler: jest.fn()
      }
      const component = renderForm(mockProps)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('mapStateToProps', () => {
    it('should match snapshot', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        checklistDetail: {
          isSubmitting: true,
          checklistDetailData: {
            contact: contact
          }
        }
      } as ReduxState
      const expected = {
        isSubmitting: true,
        contact: contact
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should match snapshot', () => {
      const mockState = {
        checklistDetail: {
          isSubmitting: true,
          checklistDetailData: {
            contact: contact
          }
        }
      } as any
      const expected = {
        isSubmitting: true,
        contact: contact
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch when involked onPrevHandler', () => {
      const mockDispatch = jest.fn()
      const mockOwnProps = {
        id: '1'
      }
      const { onPrevHandler } = mapDispatchToProps(mockDispatch, mockOwnProps)
      onPrevHandler()
      expect(mockDispatch).toBeCalled()
    })

    it('should call dispatch when involked onNextHandler', () => {
      const mockDispatch = jest.fn()
      const mockOwnProps = {
        id: '1'
      }
      const { onNextHandler } = mapDispatchToProps(mockDispatch, mockOwnProps)
      onNextHandler()
      expect(mockDispatch).toBeCalled()
    })
  })
})
