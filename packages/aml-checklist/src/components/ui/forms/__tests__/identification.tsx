import React from 'react'
import { shallow } from 'enzyme'
import { contact } from '@/sagas/__stubs__/contact'
import Identification, { renderFormHandler, onSubmitHandler } from '../identification'
import { IdentificationProps, IDENTIFICATION_FORM_DEFAULT_VALUES } from '../identification'

describe('Identification', () => {
  describe('renderFormHandler', () => {
    it('should match snapshot when DISABLED true', () => {
      const mockProps = {
        contact: contact,
        initFormValues: IDENTIFICATION_FORM_DEFAULT_VALUES,
        loading: false,
        disabled: true,
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn(),
        onSaveHandler: jest.fn(),
      } as IdentificationProps
      const component = renderFormHandler(mockProps)({ values: {} })
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot when DISABLED false', () => {
      const mockProps = {
        contact: contact,
        initFormValues: IDENTIFICATION_FORM_DEFAULT_VALUES,
        loading: false,
        disabled: false,
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn(),
        onSaveHandler: jest.fn(),
      } as IdentificationProps
      const component = renderFormHandler(mockProps)({ values: {} })
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('onSubmitHandler', () => {
    it('should run correctly', () => {
      const mockOnSaveHandler = jest.fn()
      onSubmitHandler(mockOnSaveHandler)(IDENTIFICATION_FORM_DEFAULT_VALUES)
      expect(mockOnSaveHandler).toBeCalledWith(IDENTIFICATION_FORM_DEFAULT_VALUES)
    })
  })
  describe('Identification', () => {
    it('should match snapshot', () => {
      const mockProps = {
        loading: false,
        contact: contact,
        identityCheckModel: null,
        initFormValues: {} as any,
        onSaveHandler: jest.fn(),
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn(),
      }
      const wrapper = shallow(<Identification {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
