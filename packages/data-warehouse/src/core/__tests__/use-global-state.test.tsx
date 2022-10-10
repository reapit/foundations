import React from 'react'
import { render } from '../../tests/react-testing'
import { mockSubscriptionsModelPagedResult } from '../../tests/__stubs__/subscriptions'
import { getCurrentSubscription, GlobalProvider } from '../use-global-state'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
}))

describe('GlobalProvider', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <GlobalProvider>
          <div />
        </GlobalProvider>,
      ),
    ).toMatchSnapshot()
  })
})

describe('getCurrentSubscription', () => {
  it('should return the current subscription', () => {
    const curried = getCurrentSubscription(mockSubscriptionsModelPagedResult)

    const result = curried()

    expect(result).toEqual(mockSubscriptionsModelPagedResult.data[0])
  })
})
