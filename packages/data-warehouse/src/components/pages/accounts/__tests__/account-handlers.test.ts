import {
  createAccountsService,
  disableAccountsService,
  getAccountsService,
  updateAccountService,
} from '../../../../services/accounts'
import { AccountCreateModel } from '../../../../types/accounts'
import { createAccount, disableAccount, handlePolling, updateAccount } from '../account-handlers'

jest.mock('../../../../services/accounts', () => ({
  getAccountService: jest.fn(() => ({ status: 'User is active' })),
  createAccountsService: jest.fn(() => 'https://some-url/SOME_ID'),
  getAccountsService: jest.fn(() => ({})),
  updateAccountService: jest.fn(() => true),
  disableAccountsService: jest.fn(() => true),
}))

describe('account handlers', () => {
  describe('handlePolling', () => {
    it('should wait on accounts service and set percent complete to 100 on done', async () => {
      const mockSetPercentComplete = jest.fn()
      const accountUri = 'https://some-url/SOME_ID'
      const timer = await handlePolling(mockSetPercentComplete, accountUri)
      jest.runAllTimers()
      expect(mockSetPercentComplete).toHaveBeenLastCalledWith(100)
      expect(timer).toEqual(3)
    })
  })

  describe('createAccount', () => {
    it('should wait on create accounts service', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetProvisionInProgress = jest.fn()
      const mockSetPercentComplete = jest.fn()
      const mockSetAccounts = jest.fn()
      const mockAccount = {} as AccountCreateModel

      await createAccount(
        mockSetMessageState,
        mockSetProvisionInProgress,
        mockSetPercentComplete,
        mockSetAccounts,
        mockAccount,
      )

      expect(mockSetAccounts).toHaveBeenLastCalledWith({})
      expect(mockSetMessageState).toHaveBeenLastCalledWith({ infoMessage: 'Successfully provisioned account' })
    })

    it('should handle an error if create account does not return ', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetProvisionInProgress = jest.fn()
      const mockSetPercentComplete = jest.fn()
      const mockSetAccounts = jest.fn()
      const mockAccount = {} as AccountCreateModel
      ;(createAccountsService as jest.Mock).mockReturnValueOnce(undefined)

      await createAccount(
        mockSetMessageState,
        mockSetProvisionInProgress,
        mockSetPercentComplete,
        mockSetAccounts,
        mockAccount,
      )

      expect(mockSetProvisionInProgress).toHaveBeenLastCalledWith(false)
      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong creating account, please try again',
      })
    })

    it('should handle an error if fetching accounts does not return ', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetProvisionInProgress = jest.fn()
      const mockSetPercentComplete = jest.fn()
      const mockSetAccounts = jest.fn()
      const mockAccount = {} as AccountCreateModel
      ;(getAccountsService as jest.Mock).mockReturnValueOnce(undefined)

      await createAccount(
        mockSetMessageState,
        mockSetProvisionInProgress,
        mockSetPercentComplete,
        mockSetAccounts,
        mockAccount,
      )

      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong fetching accounts, please try again',
      })
    })
  })

  describe('updateAccount', () => {
    it('should wait on update accounts service ', async () => {
      const mockSetMessageState = jest.fn()
      const mockAccount = {} as AccountCreateModel
      const mockAccountId = 'SOME_ID'

      await updateAccount(mockSetMessageState, mockAccount, mockAccountId)

      expect(mockSetMessageState).toHaveBeenLastCalledWith({ infoMessage: 'Successfully updated password' })
    })

    it('should handle an error if updateAccountsService does not return ', async () => {
      const mockSetMessageState = jest.fn()
      const mockAccount = {} as AccountCreateModel
      const mockAccountId = 'SOME_ID'
      ;(updateAccountService as jest.Mock).mockReturnValueOnce(undefined)

      await updateAccount(mockSetMessageState, mockAccount, mockAccountId)

      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong updating password, please try again',
      })
    })
  })

  describe('disableAccount', () => {
    it('should wait on disabled accounts service and set accounts on done', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetDisabling = jest.fn()
      const mockSetAccounts = jest.fn()
      const mockValue = 'SOME_ID'

      await disableAccount(mockSetMessageState, mockSetAccounts, mockSetDisabling, mockValue)()
      expect(mockSetDisabling).toHaveBeenCalledWith(true)
      expect(mockSetDisabling).toHaveBeenLastCalledWith(false)
      expect(mockSetMessageState).toHaveBeenLastCalledWith({ infoMessage: 'Account successfully deleted' })
      expect(mockSetAccounts).toHaveBeenLastCalledWith({})
    })

    it('should handle an error if disableAccountsService fails', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetDisabling = jest.fn()
      const mockSetAccounts = jest.fn()
      const mockValue = 'SOME_ID'
      ;(disableAccountsService as jest.Mock).mockReturnValueOnce(undefined)

      await disableAccount(mockSetMessageState, mockSetAccounts, mockSetDisabling, mockValue)()
      expect(mockSetDisabling).toHaveBeenCalledWith(true)
      expect(mockSetDisabling).toHaveBeenLastCalledWith(false)
      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong deleting account, please try again',
      })
    })

    it('should handle an error if getAccountsService fails', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetDisabling = jest.fn()
      const mockSetAccounts = jest.fn()
      const mockValue = 'SOME_ID'
      ;(getAccountsService as jest.Mock).mockReturnValueOnce(undefined)

      await disableAccount(mockSetMessageState, mockSetAccounts, mockSetDisabling, mockValue)()
      expect(mockSetDisabling).toHaveBeenCalledWith(true)
      expect(mockSetDisabling).toHaveBeenLastCalledWith(false)
      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong fetching accounts, please try again',
      })
    })
  })
})
