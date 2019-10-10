import React from 'react'
import { shallow } from 'enzyme'
import { PepSearch, mapStateToProps, mapDispatchToProps, renderNoResult, renderLoading } from '../pep-search'
import { ReduxState } from '@/types/core'
import { renderForm } from '../declaration-and-risk-assessment'

describe('pep-search', () => {
  describe('PepSearch', () => {
    it('should match snapshot', () => {
      const mockProps = {
        handleSubmit: jest.fn(),
        onPrevHandler: jest.fn(),
        onNextHandler: jest.fn(),
        isSubmitting: false,
        pepSearchResultData: [],
        pepSearchParam: ''
      }
      const wrapper = shallow(<PepSearch {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const input = {
        checklistDetail: {
          isSubmitting: true,
          pepSearchParam: '',
          pepSearchResultData: []
        }
      } as ReduxState
      const expected = {
        isSubmitting: true,
        pepSearchResultData: [],
        pepSearchParam: ''
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(expected)
    })
    it('should should return false', () => {
      const input = {} as ReduxState
      const expected = {
        isSubmitting: false,
        pepSearchResultData: null,
        pepSearchParam: ''
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
  })

  describe('renderForm', () => {
    it('should match snapshot', () => {
      const mockProps = {
        onPrevHandler: jest.fn(),
        onNextHandler: jest.fn(),
        isSubmitting: false
      }
      const component = renderForm(mockProps)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderNoResult', () => {
    // Disabling test as fails on CI owing to mock DayJS issue - see jest.setup for explanation
    xit('should match snapshot', () => {
      const mockProps = {
        name: 'mockName'
      }
      const component = renderNoResult(mockProps)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderLoading', () => {
    it('should match snapshot', () => {
      const component = renderLoading()
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
