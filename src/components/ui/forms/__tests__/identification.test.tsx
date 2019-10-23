import React from 'react'
import { shallow } from 'enzyme'
import { contact } from '@/sagas/__stubs__/contact'
import Identification, { renderFormHandler, onSubmitHandler } from '../identification'

describe('Identification', () => {
  describe('renderFormHandler', () => {
    it('should match snapshot', () => {
      const mockProps = {
        contactModel: contact,
        loading: false,
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn(),
        isDesktopMode: false
      }
      const component = renderFormHandler(mockProps)
      const wrapper = shallow(<div>{component}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('onSubmitHandler', () => {
    it('should run correctly', () => {
      const mockOnSaveHandler = jest.fn()
      onSubmitHandler({} as any, mockOnSaveHandler)
      expect(mockOnSaveHandler).toBeCalledWith({})
    })
  })
  describe('Identification', () => {
    it('should match snapshot when DISABLED true', () => {
      const mockProps = {
        loading: false,
        disabled: true,
        contactModel: contact,
        initFormValues: {} as any,
        onSaveHandler: jest.fn(),
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn(),
        isDesktopMode: false
      }
      const wrapper = shallow(<Identification {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })

  it('should match snapshot when DISABLED false', () => {
    const mockProps = {
      loading: false,
      disabled: false,
      contactModel: contact,
      initFormValues: {} as any,
      onSaveHandler: jest.fn(),
      onNextHandler: jest.fn(),
      onPrevHandler: jest.fn(),
      isDesktopMode: false
    }
    const wrapper = shallow(<Identification {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
