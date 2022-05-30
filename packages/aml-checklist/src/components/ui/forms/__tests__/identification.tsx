import React from 'react'
import { render } from '../../../tests/react-testing'
import { contact } from '@/sagas/__stubs__/contact'
import Identification, { onSubmitHandler, handleFilenameClick, IdentityDocumentForm } from '../identification'
import { IDENTIFICATION_FORM_DEFAULT_VALUES } from '../identification'
import { downloadDocument } from '@/services/documents'

jest.mock('@/services/documents')

describe('Identification', () => {
  describe('onSubmitHandler', () => {
    it('should run correctly', () => {
      const mockOnSaveHandler = jest.fn()
      onSubmitHandler(mockOnSaveHandler)(IDENTIFICATION_FORM_DEFAULT_VALUES)
      expect(mockOnSaveHandler).toBeCalledWith(IDENTIFICATION_FORM_DEFAULT_VALUES)
    })
  })
  describe('handleFilenameClick', () => {
    it('should run correctly', () => {
      const mockValues: IdentityDocumentForm = {
        documentId: 'test',
      }
      const mockEvent = {
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
      }
      handleFilenameClick(mockValues, jest.fn())(mockEvent)
      expect(mockEvent.preventDefault).toBeCalled()
      expect(mockEvent.stopPropagation).toBeCalled()
      expect(downloadDocument).toBeCalledWith(mockValues.documentId)
    })
  })
  describe('Identification', () => {
    it('should match snapshot when loading is false', () => {
      const mockProps = {
        loading: false,
        contact: contact,
        identityCheckModel: null,
        initFormValues: {} as any,
        onSaveHandler: jest.fn(),
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn(),
      }
      const wrapper = render(<Identification {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot when loading is true', () => {
      const mockProps = {
        loading: true,
        contact: contact,
        identityCheckModel: null,
        initFormValues: {} as any,
        onSaveHandler: jest.fn(),
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn(),
      }
      const wrapper = render(<Identification {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
    it('should show warning about primary id label', () => {
      const mockProps = {
        loading: false,
        contact: contact,
        identityCheckModel: null,
        initFormValues: {} as any,
        onSaveHandler: jest.fn(),
        onNextHandler: jest.fn(),
        onPrevHandler: jest.fn(),
        disabled: true,
      }
      const wrapper = render(<Identification {...mockProps} />)
      expect(wrapper.dive().find('p[data-test="primaryIdWarinLabel"]').length).toBe(1)
    })
  })
})
