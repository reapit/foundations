import { onSubmitHandler, handleFilenameClick, IdentityDocumentForm, IDENTIFICATION_FORM_DEFAULT_VALUES } from '../identification'
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
})
