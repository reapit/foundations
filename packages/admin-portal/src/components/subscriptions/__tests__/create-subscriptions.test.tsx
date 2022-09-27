import { SubscriptionModel } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockSubscriptionModelPagedResult } from '../../../tests/__stubs__/subscriptions'
import {
  cancelSubscriptionHander,
  createSubscriptionHander,
  CreateSubscriptionsButton,
  CreateSubscriptionsButtonProps,
  handleFetchSubs,
} from '../create-subscriptions'

jest.mock('../../../core/use-permissions-state')
jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [false, undefined, jest.fn(), true]),
  objectToQuery: jest.fn(),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

const props: CreateSubscriptionsButtonProps = {
  subscriptionType: 'applicationListing',
  developerId: 'DEVELOPER_ID',
  appId: 'APP_ID',
}

describe('CreateSubscriptionsButton', () => {
  it('should match a snapshot with no subscriptions', () => {
    expect(render(<CreateSubscriptionsButton {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot with subscriptions and applicationListing', () => {
    mockUseReapitGet.mockReturnValue([mockSubscriptionModelPagedResult, false, undefined, jest.fn()])
    expect(render(<CreateSubscriptionsButton {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot with subscriptions and developerRegistration', () => {
    mockUseReapitGet.mockReturnValue([mockSubscriptionModelPagedResult, false, undefined, jest.fn()])
    expect(
      render(<CreateSubscriptionsButton {...{ ...props, subscriptionType: 'developerRegistration' }} />),
    ).toMatchSnapshot()
  })
})

describe('createSubscriptionHander', () => {
  it('should handle creating subscriptions', () => {
    const createSubscription = jest.fn()
    const createSubscriptionModel = mockSubscriptionModelPagedResult.data as SubscriptionModel[][0]
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
