import { createRequestService } from '../../../../services/requests'
import { deleteSharesService, getSharesService } from '../../../../services/shares'
import { createRequest, deleteShare, handleMouseLeave, handleCopyCode } from '../data-handlers'

jest.mock('../../../../services/shares', () => ({
  getSharesService: jest.fn(() => ({})),
  deleteSharesService: jest.fn(() => true),
}))

jest.mock('../../../../services/requests', () => ({
  createRequestService: jest.fn(() => true),
}))

describe('data handlers', () => {
  describe('createRequest', () => {
    it('should wait on create request service and set shares when done', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetCreatingState = jest.fn()
      const mockSetShares = jest.fn()
      const mockValue = 'SOME_ID'

      await createRequest(mockSetMessageState, mockSetCreatingState, mockSetShares, mockValue)()
      expect(mockSetCreatingState).toHaveBeenCalledWith('SOME_ID')
      expect(mockSetCreatingState).toHaveBeenLastCalledWith('')
      expect(mockSetMessageState).toHaveBeenLastCalledWith({ infoMessage: 'Successfully created a share' })
      expect(mockSetShares).toHaveBeenLastCalledWith({})
    })

    it('should handle the error if no share is created', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetCreatingState = jest.fn()
      const mockSetShares = jest.fn()
      const mockValue = 'SOME_ID'
      ;(createRequestService as jest.Mock).mockReturnValueOnce(undefined)

      await createRequest(mockSetMessageState, mockSetCreatingState, mockSetShares, mockValue)()

      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong creating share, please try again',
      })
    })

    it('should handle the error if no shares are fetched', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetCreatingState = jest.fn()
      const mockSetShares = jest.fn()
      const mockValue = 'SOME_ID'
      ;(getSharesService as jest.Mock).mockReturnValueOnce(undefined)

      await createRequest(mockSetMessageState, mockSetCreatingState, mockSetShares, mockValue)()

      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong fetching shares, please try refreshing',
      })
    })
  })

  describe('deleteShare', () => {
    it('should wait on deleteShare service and set shares on done', async () => {
      const mockSetMessageState = jest.fn()
      const mockDeletingShare = jest.fn()
      const mockSetShares = jest.fn()
      const mockValue = 'SOME_ID'

      await deleteShare(mockSetMessageState, mockDeletingShare, mockSetShares, mockValue)()
      expect(mockDeletingShare).toHaveBeenCalledWith('SOME_ID')
      expect(mockDeletingShare).toHaveBeenLastCalledWith('')
      expect(mockSetMessageState).toHaveBeenLastCalledWith({ infoMessage: 'Successfully deleted share' })
      expect(mockSetShares).toHaveBeenLastCalledWith({})
    })

    it('should handle an error if deleteSharesService does not return', async () => {
      const mockSetMessageState = jest.fn()
      const mockDeletingShare = jest.fn()
      const mockSetShares = jest.fn()
      const mockValue = 'SOME_ID'
      ;(deleteSharesService as jest.Mock).mockReturnValueOnce(undefined)

      await deleteShare(mockSetMessageState, mockDeletingShare, mockSetShares, mockValue)()

      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong deleting this data share',
      })
    })

    it('should handle an error if getSharesService does not return', async () => {
      const mockSetMessageState = jest.fn()
      const mockDeletingShare = jest.fn()
      const mockSetShares = jest.fn()
      const mockValue = 'SOME_ID'
      ;(getSharesService as jest.Mock).mockReturnValueOnce(undefined)

      await deleteShare(mockSetMessageState, mockDeletingShare, mockSetShares, mockValue)()

      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong fetching shares',
      })
    })
  })

  describe('handleMouseLeave', () => {
    it('should call the handler with the message', () => {
      const mockHandler = jest.fn()
      const mockMessage = 'SOME_ID'

      handleMouseLeave(mockHandler, mockMessage)()

      expect(mockHandler).toHaveBeenCalledWith(mockMessage)
    })
  })

  describe('handleCopyCode', () => {
    it('should call the handler with the message', () => {
      const mockHandler = jest.fn()
      const mockMessage = 'Copied'

      handleCopyCode(mockHandler)()

      expect(mockHandler).toHaveBeenCalledWith(mockMessage)
    })
  })
})
