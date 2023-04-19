import React from 'react'
import {
  handleDeleteSubscription,
  handleRefreshSubscriptions,
  handleSetSubscriptionId,
  SettingsSubscriptionsPage,
} from '..'
import { render, setViewport } from '../../../../tests/react-testing'
import { mockSubscriptionModelPagedResult } from '../../../../tests/__stubs__/subscriptions'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockSubscriptionModelPagedResult, true]),
  useReapitUpdate: jest.fn(() => []),
}))

describe('SettingsSubscriptionsPage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsSubscriptionsPage />)).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(render(<SettingsSubscriptionsPage />)).toMatchSnapshot()
  })
})

describe('handleRefreshSubscriptions', () => {
  it('should refresh subs if one param is true', () => {
    const refreshSubscriptions = jest.fn()
    const updateSubscriptionSuccess = true
    const deleteSubscriptionSuccess = false
    const reinviteSubscriptionSuccess = false

    const curried = handleRefreshSubscriptions(
      refreshSubscriptions,
      updateSubscriptionSuccess,
      deleteSubscriptionSuccess,
      reinviteSubscriptionSuccess,
    )

    curried()

    expect(refreshSubscriptions).toHaveBeenCalledTimes(1)
  })

  it('should refresh subs if none of the params are true', () => {
    const refreshSubscriptions = jest.fn()
    const updateSubscriptionSuccess = false
    const deleteSubscriptionSuccess = false
    const reinviteSubscriptionSuccess = false

    const curried = handleRefreshSubscriptions(
      refreshSubscriptions,
      updateSubscriptionSuccess,
      deleteSubscriptionSuccess,
      reinviteSubscriptionSuccess,
    )

    curried()

    expect(refreshSubscriptions).not.toHaveBeenCalled()
  })
})

describe('handleSetSubscriptionId', () => {
  it('should refresh a member on success', () => {
    const setSubscriptionId = jest.fn()
    const subscriptionId = 'MOCK_ID'

    const curried = handleSetSubscriptionId(setSubscriptionId, subscriptionId)

    curried()

    expect(setSubscriptionId).toHaveBeenCalledWith(subscriptionId)
  })
})

describe('handleDeleteSubscription', () => {
  it('should refresh a member on success', () => {
    const deleteSubscription = jest.fn()
    const setSubscriptionId = jest.fn()
    const subscriptionId = 'MOCK_ID'

    const curried = handleDeleteSubscription(deleteSubscription, setSubscriptionId, subscriptionId)

    curried()

    expect(deleteSubscription).toHaveBeenCalledTimes(1)
    expect(setSubscriptionId).toHaveBeenCalledWith(null)
  })
})
