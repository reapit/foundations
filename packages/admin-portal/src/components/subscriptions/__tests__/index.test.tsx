import React from 'react'
import Subscriptions, { handleCancelSub, handleCancelSubSuccess, handleSetSubId } from '../index'
import { render } from '../../../tests/react-testing'
import { mockDeveloperModelPagedResult } from '../../../tests/__stubs__/developers'
import { mockSubscriptionModelPagedResult } from '../../../tests/__stubs__/subscriptions'
import { useReapitGet } from '@reapit/use-reapit-data'

jest.mock('../../../core/use-permissions-state')
jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('Subscriptions', () => {
  it('should render component when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<Subscriptions />)).toMatchSnapshot()
  })

  it('should render component when has data', () => {
    mockUseReapitGet
      .mockReturnValue([mockSubscriptionModelPagedResult, false])
      .mockReturnValue([mockDeveloperModelPagedResult, false])
    expect(render(<Subscriptions />)).toMatchSnapshot()
  })
})

describe('handleCancelSub', () => {
  it('handleCancelSub should  correctly set the cancel sub id', async () => {
    const cancelSub = jest.fn(() => Promise.resolve(true))
    const setCancelSubId = jest.fn()
    const curried = handleCancelSub(cancelSub, setCancelSubId)

    await curried()

    expect(cancelSub).toHaveBeenCalledTimes(1)
    expect(setCancelSubId).toHaveBeenCalledWith(null)
  })
})
describe('handleCancelSubSuccess', () => {
  it('handleCancelSubSuccess should refresh subs on success', () => {
    const refetchSubs = jest.fn()
    const closeModal = jest.fn()
    const success = true
    const curried = handleCancelSubSuccess(refetchSubs, closeModal, success)

    curried()

    expect(refetchSubs).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleSetSubId', () => {
  it('handleSetSubId should correctly set the sub id', () => {
    const setCancelSubId = jest.fn()
    const openModal = jest.fn()
    const cancelSubId = 'MOCK_ID'
    const curried = handleSetSubId(setCancelSubId, openModal, cancelSubId)

    curried()

    expect(openModal).toHaveBeenCalledTimes(1)
    expect(setCancelSubId).toHaveBeenCalledWith(cancelSubId)
  })
})
