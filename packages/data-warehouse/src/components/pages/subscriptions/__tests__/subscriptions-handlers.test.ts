import {
  createSubscription,
  deleteSubscription,
  getCurrentSubscription,
  handleGetSubscriptions,
  handleSubscriptionToggle,
} from '../subscriptions-handlers'
import {
  createSubscriptionsService,
  deleteSubscriptionsService,
  getSubscriptionsService,
} from '../../../../services/subscriptions'
import { LoginIdentity } from '@reapit/connect-session'

jest.mock('../../../../services/subscriptions', () => ({
  createSubscriptionsService: jest.fn(() => 'https://some-url/SOME_ID'),
  getSubscriptionsService: jest.fn(() => ({})),
  deleteSubscriptionsService: jest.fn(() => true),
}))

describe('createSubscription', () => {
  it('should return undefined if loginIdentity is not populated', async () => {
    const mockSetMessageState = jest.fn()
    const mockSetSubsctiptions = jest.fn()
    const mockLoginIdentity = {} as LoginIdentity

    expect(await createSubscription(mockLoginIdentity, mockSetMessageState, mockSetSubsctiptions)).toBeUndefined()
    expect(mockSetMessageState).not.toHaveBeenCalled()
    expect(mockSetSubsctiptions).not.toHaveBeenCalled()
  })

  it('should call the subscription create service then fetch subscriptions on success', async () => {
    const mockSetMessageState = jest.fn()
    const mockSetSubsctiptions = jest.fn()
    const mockLoginIdentity = {
      developerId: 'SOME_ID',
      clientId: 'SOME_CLIENT_ID',
      email: 'mail@mail.com',
    } as LoginIdentity

    await createSubscription(mockLoginIdentity, mockSetMessageState, mockSetSubsctiptions)

    expect(createSubscriptionsService).toHaveBeenCalledWith({
      developerId: mockLoginIdentity.developerId,
      applicationId: '',
      user: mockLoginIdentity.email,
      customerId: mockLoginIdentity.clientId,
      type: 'dataWarehouse',
    })

    expect(getSubscriptionsService).toHaveBeenCalled()
    expect(mockSetSubsctiptions).toHaveBeenCalledWith({})
    expect(mockSetMessageState).toHaveBeenCalledWith({ infoMessage: 'Successfully subscribed' })
  })

  it('should call the subscription create service then display an error message if it fails', async () => {
    const mockSetMessageState = jest.fn()
    const mockSetSubsctiptions = jest.fn()
    const mockLoginIdentity = {
      developerId: 'SOME_ID',
      clientId: 'SOME_CLIENT_ID',
      email: 'mail@mail.com',
    } as LoginIdentity
    ;(createSubscriptionsService as jest.Mock).mockReturnValueOnce(undefined)

    await createSubscription(mockLoginIdentity, mockSetMessageState, mockSetSubsctiptions)

    expect(createSubscriptionsService).toHaveBeenCalledWith({
      developerId: mockLoginIdentity.developerId,
      applicationId: '',
      user: mockLoginIdentity.email,
      customerId: mockLoginIdentity.clientId,
      type: 'dataWarehouse',
    })

    expect(getSubscriptionsService).toHaveBeenCalled()
    expect(mockSetSubsctiptions).not.toHaveBeenCalled()
    expect(mockSetMessageState).toHaveBeenCalledWith({ errorMessage: 'Something went wrong subscribing' })
  })
})

describe('deleteSubscription', () => {
  it('should call the subscription delete service then fetch subscriptions on success', async () => {
    const mockSetMessageState = jest.fn()
    const mockSetSubsctiptions = jest.fn()
    const mockCurrentSubscription = {
      id: 'SOME_ID',
    }

    await deleteSubscription(mockCurrentSubscription, mockSetMessageState, mockSetSubsctiptions)

    expect(deleteSubscriptionsService).toHaveBeenCalledWith(mockCurrentSubscription.id)

    expect(getSubscriptionsService).toHaveBeenCalled()
    expect(mockSetSubsctiptions).toHaveBeenCalledWith({})
    expect(mockSetMessageState).toHaveBeenCalledWith({ infoMessage: 'Successfully unsubscribed' })
  })

  it('should call the subscription delete service then display an error message if it fails', async () => {
    const mockSetMessageState = jest.fn()
    const mockSetSubsctiptions = jest.fn()
    const mockCurrentSubscription = {
      id: 'SOME_ID',
    }
    ;(deleteSubscriptionsService as jest.Mock).mockReturnValueOnce(undefined)

    await deleteSubscription(mockCurrentSubscription, mockSetMessageState, mockSetSubsctiptions)

    expect(deleteSubscriptionsService).toHaveBeenCalledWith(mockCurrentSubscription.id)

    expect(mockSetSubsctiptions).not.toHaveBeenCalled()
    expect(mockSetMessageState).toHaveBeenCalledWith({ errorMessage: 'Something went wrong unsubscribing' })
  })
})

describe('handleSubscriptionToggle', () => {
  it('should return if the LoginIdentity object is not populated', () => {
    const mockSetMessageState = jest.fn()
    const mockSetSubsctiptions = jest.fn()
    const mockCurrentSubscription = {
      id: 'SOME_ID',
    }
    const mockLoginIdentity = {} as LoginIdentity

    const curried = handleSubscriptionToggle(
      mockCurrentSubscription,
      mockLoginIdentity,
      mockSetMessageState,
      mockSetSubsctiptions,
    )
    expect(curried()).toBeUndefined()
  })

  it('should call delete subscription if there is a current subscription', () => {
    const mockSetMessageState = jest.fn()
    const mockSetSubsctiptions = jest.fn()
    const mockCurrentSubscription = {
      id: 'SOME_ID',
    }
    const mockLoginIdentity = {
      developerId: 'SOME_ID',
      clientId: 'SOME_CLIENT_ID',
      email: 'mail@mail.com',
    } as LoginIdentity

    const curried = handleSubscriptionToggle(
      mockCurrentSubscription,
      mockLoginIdentity,
      mockSetMessageState,
      mockSetSubsctiptions,
    )
    curried()

    expect(deleteSubscriptionsService).toHaveBeenCalledWith(mockCurrentSubscription.id)
  })

  it('should call create subscription if there is no current subscription', () => {
    const mockSetMessageState = jest.fn()
    const mockSetSubsctiptions = jest.fn()
    const mockCurrentSubscription = null
    const mockLoginIdentity = {
      developerId: 'SOME_ID',
      clientId: 'SOME_CLIENT_ID',
      email: 'mail@mail.com',
    } as LoginIdentity

    const curried = handleSubscriptionToggle(
      mockCurrentSubscription,
      mockLoginIdentity,
      mockSetMessageState,
      mockSetSubsctiptions,
    )
    curried()

    expect(createSubscriptionsService).toHaveBeenCalledWith({
      developerId: mockLoginIdentity.developerId,
      applicationId: '',
      user: mockLoginIdentity.email,
      customerId: mockLoginIdentity.clientId,
      type: 'dataWarehouse',
    })
  })
})

describe('getCurrentSubscription', () => {
  it('should correctly find a current subscription and ignore invalid entries', () => {
    const mockCurrentSubscriptions = {
      data: [
        {
          developerId: 'SOME_INVALID_ID',
          type: 'dataWarehouse',
        },
        {
          developerId: 'SOME_ID',
          type: 'dataWarehouse',
          cancelled: 'CANCELLED',
        },
        {
          developerId: 'SOME_ID',
          type: 'dataWarehouse',
        },
      ],
    }
    const mockDeveloperId = 'SOME_ID'

    const curentSubscription = getCurrentSubscription(mockCurrentSubscriptions, mockDeveloperId)
    expect(curentSubscription).toEqual(mockCurrentSubscriptions.data[2])
  })

  it('should return null if no subscriptions', () => {
    const mockCurrentSubscriptions = {
      data: [],
    }
    const mockDeveloperId = 'SOME_ID'

    const curentSubscription = getCurrentSubscription(mockCurrentSubscriptions, mockDeveloperId)
    expect(curentSubscription).toBeNull()
  })

  it('should return null if no valid subscriptions', () => {
    const mockCurrentSubscriptions = {
      data: [
        {
          developerId: 'SOME_INVALID_ID',
          type: 'dataWarehouse',
        },
        {
          developerId: 'SOME_ID',
          type: 'dataWarehouse',
          cancelled: 'CANCELLED',
        },
      ],
    }
    const mockDeveloperId = 'SOME_ID'

    const curentSubscription = getCurrentSubscription(mockCurrentSubscriptions, mockDeveloperId)
    expect(curentSubscription).toBeNull()
  })

  it('should return null if no developerId', () => {
    const mockCurrentSubscriptions = {
      data: [
        {
          developerId: 'SOME_ID',
          type: 'dataWarehouse',
        },
      ],
    }
    const mockDeveloperId = ''

    const curentSubscription = getCurrentSubscription(mockCurrentSubscriptions, mockDeveloperId)
    expect(curentSubscription).toBeNull()
  })
})

describe('handleGetSubscriptions', () => {
  it('should get and set subscriptions if there is a developerId', async () => {
    const mockSetSubscriptions = jest.fn()
    const mockSetSubscriptionsLoading = jest.fn()
    const mockSetMessageState = jest.fn()
    const mockDeveloperId = 'SOME_ID'
    const curried = handleGetSubscriptions(
      mockSetSubscriptions,
      mockSetSubscriptionsLoading,
      mockSetMessageState,
      mockDeveloperId,
    )

    await curried()

    expect(mockSetSubscriptionsLoading).toHaveBeenCalledWith(true)
    expect(mockSetSubscriptions).toHaveBeenCalledWith({})
    expect(mockSetSubscriptionsLoading).toHaveBeenLastCalledWith(false)
    expect(mockSetMessageState).not.toHaveBeenCalled()
  })

  it('should show an error message if fetching fails', async () => {
    const mockSetSubscriptions = jest.fn()
    const mockSetSubscriptionsLoading = jest.fn()
    const mockSetMessageState = jest.fn()
    const mockDeveloperId = 'SOME_ID'
    ;(getSubscriptionsService as jest.Mock).mockReturnValueOnce(undefined)
    const curried = handleGetSubscriptions(
      mockSetSubscriptions,
      mockSetSubscriptionsLoading,
      mockSetMessageState,
      mockDeveloperId,
    )

    await curried()

    expect(mockSetSubscriptionsLoading).toHaveBeenCalledWith(true)
    expect(mockSetSubscriptions).not.toHaveBeenCalled()
    expect(mockSetSubscriptionsLoading).toHaveBeenLastCalledWith(false)
    expect(mockSetMessageState).toHaveBeenCalledWith({
      errorMessage: 'Something went wrong fetching subscriptions, please try again',
    })
  })
})
