import { Marketplace } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/use-reapit-data'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockSubscriptionModelPagedResult } from '../../../tests/__stubs__/subscriptions'
import {
  cancelSubscriptionHander,
  createSubscriptionHander,
  CreateSubscriptions,
  CreateSubscriptionsProps,
  handleFetchSubs,
  handleUpdateAction,
  ToggleSubscribedForm,
} from '../create-subscriptions'

jest.mock('../../../core/use-permissions-state')
jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [false, undefined, jest.fn(), true]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

const props: CreateSubscriptionsProps = {
  subscriptionType: 'applicationListing',
  developerId: 'DEVELOPER_ID',
  appId: 'APP_ID',
}

describe('CreateSubscriptions', () => {
  it('should match a snapshot with subscriptions and applicationListing', () => {
    mockUseReapitGet.mockReturnValue([mockSubscriptionModelPagedResult, false, undefined, jest.fn()])
    expect(render(<CreateSubscriptions {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot with subscriptions and developerRegistration', () => {
    mockUseReapitGet.mockReturnValue([mockSubscriptionModelPagedResult, false, undefined, jest.fn()])
    expect(
      render(<CreateSubscriptions {...{ ...props, subscriptionType: 'developerRegistration' }} />),
    ).toMatchSnapshot()
  })
})

describe('createSubscriptionHander', () => {
  it('should handle creating subscriptions', () => {
    const createSubscription = jest.fn()
    const createSubscriptionModel = mockSubscriptionModelPagedResult.data as Marketplace.SubscriptionModel[][0]
    const curried = createSubscriptionHander(createSubscription, createSubscriptionModel)

    curried()

    expect(createSubscription).toHaveBeenCalledWith(createSubscriptionModel)
  })
})

describe('cancelSubscriptionHander', () => {
  it('should handle canceling subscriptions', () => {
    const cancelSubscription = jest.fn()
    const curried = cancelSubscriptionHander(cancelSubscription)

    curried()

    expect(cancelSubscription).toHaveBeenCalledTimes(1)
  })
})

describe('handleFetchSubs', () => {
  it('should handle fetching subscriptions', () => {
    const cancelSubscription = jest.fn()
    const curried = handleFetchSubs(cancelSubscription)

    curried()

    expect(cancelSubscription).toHaveBeenCalledTimes(1)
  })
})

describe('handleUpdateAction', () => {
  it('should handle cancelling a sub', () => {
    const createSub = jest.fn()
    const cancelSub = jest.fn()
    const formValues = {
      isSubscribed: 'NOT_SUBSCRIBED',
    } as ToggleSubscribedForm

    const curried = handleUpdateAction(createSub, cancelSub)

    curried(formValues)

    expect(cancelSub).toHaveBeenCalledTimes(1)
    expect(createSub).not.toHaveBeenCalled()
  })

  it('should handle creating a sub', () => {
    const createSub = jest.fn()
    const cancelSub = jest.fn()
    const formValues = {
      isSubscribed: 'SUBSCRIBED',
    } as ToggleSubscribedForm

    const curried = handleUpdateAction(createSub, cancelSub)

    curried(formValues)

    expect(cancelSub).not.toHaveBeenCalled()
    expect(createSub).toHaveBeenCalledTimes(1)
  })
})
