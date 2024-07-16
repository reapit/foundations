import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleCreateIp, IpCreateModal } from '../ip-create-modal'
import { mockIpsModel } from '../../../tests/__stubs__/network'

jest.mock('../use-network-state')

describe('IpCreateModal', () => {
  it('should match a snapshot', () => {
    expect(render(<IpCreateModal closeModal={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleCreateIp', () => {
  it('should create an account successfully', async () => {
    const createIp = jest.fn(() => Promise.resolve(true))
    const refreshIps = jest.fn()
    const closeModal = jest.fn()

    const curried = handleCreateIp(createIp, refreshIps, closeModal)

    await curried(mockIpsModel)

    expect(createIp).toHaveBeenCalledWith(mockIpsModel)
    expect(refreshIps).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
