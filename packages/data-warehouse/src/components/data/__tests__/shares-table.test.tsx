import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleCopyCode, handleDeleteShare, handleMouseLeave, handleRefreshShare, SharesTable } from '../shares-table'
import { mockShares } from '../../../tests/__stubs__/shares'

describe('SharesTable', () => {
  it('should match a snapshot', () => {
    expect(render(<SharesTable shares={mockShares._embedded} refreshShares={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleCopyCode', () => {
  it('should match a snapshot', () => {
    const setCopyMessage = jest.fn()
    const curried = handleCopyCode(setCopyMessage)

    curried()

    expect(setCopyMessage).toHaveBeenCalledWith('Copied')
  })
})

describe('handleMouseLeave', () => {
  it('should match a snapshot', () => {
    const setCopyMessage = jest.fn()
    const message = 'Message'
    const curried = handleMouseLeave(setCopyMessage, message)

    curried()

    expect(setCopyMessage).toHaveBeenCalledWith(message)
  })
})

describe('handleDeleteShare', () => {
  it('should match a snapshot', async () => {
    const deleteShare = jest.fn(() => Promise.resolve(true))
    const refreshShares = jest.fn()
    const shareId = 'MOCK_ID'
    const curried = handleDeleteShare(deleteShare, refreshShares, shareId)

    curried()

    await Promise.resolve()

    expect(deleteShare).toHaveBeenCalledWith(undefined, { uriParams: { shareId } })
    expect(refreshShares).toHaveBeenCalledTimes(1)
  })
})

describe('handleRefreshShare', () => {
  it('should match a snapshot', async () => {
    const refreshShare = jest.fn(() => Promise.resolve(true))
    const refreshShares = jest.fn()
    const shareId = 'MOCK_ID'
    const curried = handleRefreshShare(refreshShare, refreshShares, shareId)

    curried()

    await Promise.resolve()

    expect(refreshShare).toHaveBeenCalledWith(undefined, { uriParams: { shareId } })
    expect(refreshShares).toHaveBeenCalledTimes(1)
  })
})
