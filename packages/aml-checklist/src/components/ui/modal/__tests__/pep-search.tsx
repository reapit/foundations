import React from 'react'
import { render } from '../../../tests/react-testing'
import {
  PepSearch,
  mapStateToProps,
  mapDispatchToProps,
  renderNoResult,
  renderLoading,
  renderForm,
} from '../pep-search'
import { ReduxState } from '@/types/core'
import { contact } from '@/sagas/__stubs__/contact'
import { ContactModel } from '@reapit/foundations-ts-definitions'

describe('pep-search', () => {
  describe('PepSearch', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contact: contact as ContactModel,
        handleSubmit: jest.fn(),
        onPrevHandler: jest.fn(),
        onNextHandler: jest.fn(),
        isSubmitting: false,
      }
      const wrapper = render(<PepSearch {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const input = {
        checklistDetail: {
          checklistDetailData: {
            contact: contact,
          },
          isSubmitting: true,
        },
      } as ReduxState
      const expected = {
        isSubmitting: true,
        contact: contact,
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(expected)
    })
    it('should should return false', () => {
      const input = {} as ReduxState
      const expected = {
        isSubmitting: false,
        contact: {},
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('onNextHandler should run correctly', () => {
      const mockDispatch = jest.fn()
      const { onNextHandler } = mapDispatchToProps(mockDispatch)
      onNextHandler()
      expect(mockDispatch).toHaveBeenCalled()
    })
    it('onPrevHandler should run correctly', () => {
      const mockDispatch = jest.fn()
      const { onPrevHandler } = mapDispatchToProps(mockDispatch)
      onPrevHandler()
      expect(mockDispatch).toHaveBeenCalled()
    })
    it('handleSubmit should run correctly', () => {
      const mockDispatch = jest.fn()
      const { handleSubmit } = mapDispatchToProps(mockDispatch)
      handleSubmit({})
      expect(mockDispatch).toHaveBeenCalled()
    })
  })

  describe('renderForm', () => {
    it('should match snapshot', () => {
      const mockProps = {
        onPrevHandler: jest.fn(),
        onNextHandler: jest.fn(),
        isSubmitting: false,
        pepSearchStatus: { AYL19000001: { param: 'a', result: [], time: '1' } },
        contact: contact,
      }
      const component = renderForm(mockProps)()
      const wrapper = render(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderNoResult', () => {
    it('should match snapshot', () => {
      const component = renderNoResult('param', 'time')
      const wrapper = render(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderLoading', () => {
    it('should match snapshot', () => {
      const component = renderLoading()
      const wrapper = render(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
