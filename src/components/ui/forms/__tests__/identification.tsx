import React from 'react'
import { shallow } from 'enzyme'
import { CreateIdentityDocumentModel, ContactModel } from '@/types/contact-api-schema'
import Identification, { renderFormHandler, onSubmitHandler, IdentificationFormValues } from '../identification'

describe('identification forms', () => {
  describe('renderFormHandler', () => {
    it('should render correctly', () => {
      const mockProps = {
        data: { id: '1' } as ContactModel,
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
      const mockValues = {} as IdentificationFormValues
      const mockOnSaveHandler = jest.fn()
      const mockData = {} as ContactModel
      onSubmitHandler(mockData, mockValues, mockOnSaveHandler)
      expect(mockOnSaveHandler).toBeCalled()
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
