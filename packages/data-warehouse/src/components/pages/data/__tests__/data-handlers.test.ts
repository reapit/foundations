import { SubscriptionModel } from '@reapit/foundations-ts-definitions'
import { getDataSetsService } from '../../../../services/data-sets'
import { createRequestService } from '../../../../services/requests'
import { deleteSharesService, getSharesService } from '../../../../services/shares'
import {
  createRequest,
  deleteShare,
  handleMouseLeave,
  handleCopyCode,
  handleGetDataSets,
  handleGetShares,
} from '../data-handlers'

jest.mock('../../../../services/shares', () => ({
  getSharesService: jest.fn(() => ({})),
  deleteSharesService: jest.fn(() => true),
}))

jest.mock('../../../../services/data-sets', () => ({
  getDataSetsService: jest.fn(() => ({})),
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

describe('handleGetDataSets', () => {
  it('should get and set data sets if there is a current subscription', async () => {
    const mockSetDataSets = jest.fn()
    const mockSetDataSetsLoading = jest.fn()
    const mockSetMessageState = jest.fn()
    const mockCurrentSubscription = {} as SubscriptionModel
    const curried = handleGetDataSets(
      mockSetDataSets,
      mockSetDataSetsLoading,
      mockSetMessageState,
      mockCurrentSubscription,
    )

    await curried()

    expect(mockSetDataSetsLoading).toHaveBeenCalledWith(true)
    expect(mockSetDataSets).toHaveBeenCalledWith({})
    expect(mockSetDataSetsLoading).toHaveBeenLastCalledWith(false)
    expect(mockSetMessageState).not.toHaveBeenCalled()
  })

  it('should show an error message if fetching fails', async () => {
    const mockSetDataSets = jest.fn()
    const mockSetDataSetsLoading = jest.fn()
    const mockSetMessageState = jest.fn()
    const mockCurrentSubscription = {} as SubscriptionModel
    ;(getDataSetsService as jest.Mock).mockReturnValueOnce(undefined)
    const curried = handleGetDataSets(
      mockSetDataSets,
      mockSetDataSetsLoading,
      mockSetMessageState,
      mockCurrentSubscription,
    )

    await curried()

    expect(mockSetDataSetsLoading).toHaveBeenCalledWith(true)
    expect(mockSetDataSets).not.toHaveBeenCalled()
    expect(mockSetDataSetsLoading).toHaveBeenLastCalledWith(false)
    expect(mockSetMessageState).toHaveBeenCalledWith({
      errorMessage: 'Something went wrong fetching data sets, please try again',
    })
  })
})

describe('handleGetShares', () => {
  it('should get and set shares if there is a current subscription', async () => {
    const mockSetShares = jest.fn()
    const mockSetSharesLoading = jest.fn()
    const mockSetMessageState = jest.fn()
    const mockCurrentSubscription = {} as SubscriptionModel
    const curried = handleGetShares(mockSetShares, mockSetSharesLoading, mockSetMessageState, mockCurrentSubscription)

    await curried()

    expect(mockSetSharesLoading).toHaveBeenCalledWith(true)
    expect(mockSetShares).toHaveBeenCalledWith({})
    expect(mockSetSharesLoading).toHaveBeenLastCalledWith(false)
    expect(mockSetMessageState).not.toHaveBeenCalled()
  })

  it('should show an error message if fetching fails', async () => {
    const mockSetShares = jest.fn()
    const mockSetSharesLoading = jest.fn()
    const mockSetMessageState = jest.fn()
    const mockCurrentSubscription = {} as SubscriptionModel
    ;(getSharesService as jest.Mock).mockReturnValueOnce(undefined)
    const curried = handleGetShares(mockSetShares, mockSetSharesLoading, mockSetMessageState, mockCurrentSubscription)

    await curried()

    expect(mockSetSharesLoading).toHaveBeenCalledWith(true)
    expect(mockSetShares).not.toHaveBeenCalled()
    expect(mockSetSharesLoading).toHaveBeenLastCalledWith(false)
    expect(mockSetMessageState).toHaveBeenCalledWith({
      errorMessage: 'Something went wrong fetching data shares, please try again',
    })
  })
})
