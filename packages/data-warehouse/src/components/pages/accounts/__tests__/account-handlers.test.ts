import { SubscriptionModel } from '@reapit/foundations-ts-definitions'
import {
  createAccountsService,
  disableAccountsService,
  getAccountsService,
  updateAccountService,
  getAccountService,
} from '../../../../services/accounts'
import { AccountCreateModel } from '../../../../types/accounts'
import { createAccount, disableAccount, handleGetAccounts, handlePolling, updateAccount } from '../account-handlers'

jest.mock('../../../../services/accounts', () => ({
  getAccountService: jest.fn(() => ({ status: 'User is active' })),
  createAccountsService: jest.fn(() => 'https://some-url/SOME_ID'),
  getAccountsService: jest.fn(() => ({})),
  updateAccountService: jest.fn(() => true),
  disableAccountsService: jest.fn(() => true),
}))

describe('account handlers', () => {
  describe('handlePolling', () => {
    it('should wait on accounts service and return a successful provision', async () => {
      const accountUri = 'https://some-url/SOME_ID'
      const result = await handlePolling(accountUri)
      jest.runAllTimers()

      expect(result).toEqual({ provisioned: true, interval: 3 })
    })

    it('should wait on accounts service and return an unsuccessful provision', async () => {
      const accountUri = 'https://some-url/SOME_ID'
      ;(getAccountService as jest.Mock).mockReturnValue({
        status: 'An error was encountered when creating this account',
      })
      const result = await handlePolling(accountUri)
      jest.runAllTimers()

      expect(result).toEqual({ provisioned: false, interval: 6 })
    })

    afterAll(() => {
      ;(getAccountService as jest.Mock).mockReturnValue({
        status: 'User is active',
      })
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
        errorMessage: 'Something went wrong creating an account, please try again',
      })
    })

    it('should handle an error if provisioning fails ', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetProvisionInProgress = jest.fn()
      const mockSetPercentComplete = jest.fn()
      const mockSetAccounts = jest.fn()
      const mockAccount = {} as AccountCreateModel
      ;(getAccountService as jest.Mock).mockReturnValue({
        status: 'An error was encountered when creating this account',
      })

      await createAccount(
        mockSetMessageState,
        mockSetProvisionInProgress,
        mockSetPercentComplete,
        mockSetAccounts,
        mockAccount,
      )

      expect(mockSetPercentComplete).toHaveBeenLastCalledWith(0)
      expect(mockSetProvisionInProgress).toHaveBeenLastCalledWith(false)
      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong creating an account, please try again',
      })
    })

    it('should handle an error if fetching accounts does not return ', async () => {
      const mockSetMessageState = jest.fn()
      const mockSetProvisionInProgress = jest.fn()
      const mockSetPercentComplete = jest.fn()
      const mockSetAccounts = jest.fn()
      const mockAccount = {} as AccountCreateModel
      ;(getAccountsService as jest.Mock).mockReturnValueOnce(undefined)
      ;(getAccountService as jest.Mock).mockReturnValue({
        status: 'User is active',
      })

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
      expect(mockSetDisabling).toHaveBeenCalledWith('SOME_ID')
      expect(mockSetDisabling).toHaveBeenLastCalledWith('')
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
      expect(mockSetDisabling).toHaveBeenCalledWith('SOME_ID')
      expect(mockSetDisabling).toHaveBeenLastCalledWith('')
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
      expect(mockSetDisabling).toHaveBeenCalledWith('SOME_ID')
      expect(mockSetDisabling).toHaveBeenLastCalledWith('')
      expect(mockSetMessageState).toHaveBeenLastCalledWith({
        errorMessage: 'Something went wrong fetching accounts, please try again',
      })
    })
  })

  describe('handleGetAccounts', () => {
    it('should get and set accounts if there is a curentSubscription', async () => {
      const mockSetAccounts = jest.fn()
      const mockSetAccountsLoading = jest.fn()
      const mockSetMessageState = jest.fn()
      const mockCurrentSubscription = {} as SubscriptionModel
      const curried = handleGetAccounts(
        mockSetAccounts,
        mockSetAccountsLoading,
        mockSetMessageState,
        mockCurrentSubscription,
      )

      await curried()

      expect(mockSetAccountsLoading).toHaveBeenCalledWith(true)
      expect(mockSetAccounts).toHaveBeenCalledWith({})
      expect(mockSetAccountsLoading).toHaveBeenLastCalledWith(false)
      expect(mockSetMessageState).not.toHaveBeenCalled()
    })

    it('should show an error message if fetching fails', async () => {
      const mockSetAccounts = jest.fn()
      const mockSetAccountsLoading = jest.fn()
      const mockSetMessageState = jest.fn()
      const mockCurrentSubscription = {} as SubscriptionModel
      ;(getAccountsService as jest.Mock).mockReturnValueOnce(undefined)
      const curried = handleGetAccounts(
        mockSetAccounts,
        mockSetAccountsLoading,
        mockSetMessageState,
        mockCurrentSubscription,
      )

      await curried()

      expect(mockSetAccountsLoading).toHaveBeenCalledWith(true)
      expect(mockSetAccounts).not.toHaveBeenCalled()
      expect(mockSetAccountsLoading).toHaveBeenLastCalledWith(false)
      expect(mockSetMessageState).toHaveBeenCalledWith({
        errorMessage: 'Something went wrong fetching accounts, please try again',
      })
    })
  })
})
