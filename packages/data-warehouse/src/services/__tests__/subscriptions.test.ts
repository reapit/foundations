import { fetcher } from '@reapit/elements'
import { CreateSubscriptionModel } from '@reapit/foundations-ts-definitions'
import { createSubscriptionsService, deleteSubscriptionsService, getSubscriptionsService } from '../subscriptions'
import { stubSubscriptions } from '../__stubs__/subscriptions'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')

const mockedFetch = fetcher as jest.Mock

describe('getSubscriptionsService', () => {
  it('should return a response from the subscription service', async () => {
    mockedFetch.mockReturnValueOnce(stubSubscriptions)
    expect(await getSubscriptionsService()).toEqual(stubSubscriptions)
  })

  it('should catch an error if no response from subscription service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getSubscriptionsService()
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to fetch subscriptions')
  })
})

describe('deleteSubscriptionsService', () => {
  it('should return a response from the subscription service', async () => {
    mockedFetch.mockReturnValueOnce(true)
    expect(await deleteSubscriptionsService('SOME_ID')).toEqual(true)
  })

  it('should catch an error if no response from subscription service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await deleteSubscriptionsService('SOME_ID')
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to delete subscription')
  })
})

describe('createSubscriptionsService', () => {
  it('should return a response from the subscription service', async () => {
    mockedFetch.mockReturnValueOnce('ok')
    expect(await createSubscriptionsService({} as CreateSubscriptionModel)).toEqual('ok')
  })

  it('should catch an error if no response from subscription service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined)
    await createSubscriptionsService({} as CreateSubscriptionModel)
    expect(errorSpy).toHaveBeenLastCalledWith('Failed to create subscription')
  })
})
