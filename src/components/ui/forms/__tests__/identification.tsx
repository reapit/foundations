import React from 'react'
import { shallow } from 'enzyme'
import { CreateIdentityDocumentModel } from '@/types/contact-api-schema'
import Identification, { renderFormHandler, onSubmitHandler } from '../identification'

describe('identification forms', () => {
  describe('renderFormHandler', () => {
    it('should render correctly', () => {
      const mockProps = {
        loading: false,
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn()
      }

      const component = renderFormHandler(mockProps)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('onSubmitHandler', () => {
    it('should work as expectations', () => {
      const mockValues = {}
      const mockOnSaveHandler = jest.fn()

      onSubmitHandler(mockValues, mockOnSaveHandler)
      expect(mockOnSaveHandler).toBeCalledWith(mockValues)
    })
  })

  describe('Identification', () => {
    it('should render correctly', () => {
      const mockProps = {
        title: 'title',
        data: {} as CreateIdentityDocumentModel,
        loading: false,
        onSaveHandler: jest.fn(),
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn()
      }

      const wrapper = shallow(<Identification {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
