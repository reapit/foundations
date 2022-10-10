import { mockAccountModelPagedResult } from '../../tests/__stubs__/accounts'
import { mockSubscriptionsModelPagedResult } from '../../tests/__stubs__/subscriptions'

export const mockGlobalState = {
  currentSubscription: mockSubscriptionsModelPagedResult.data[0],
  accounts: mockAccountModelPagedResult,
  refreshAccounts: jest.fn(),
}

export const useGlobalState = jest.fn(() => mockGlobalState)
