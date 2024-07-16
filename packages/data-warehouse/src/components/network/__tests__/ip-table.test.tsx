import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleDeleteIp, IpTable } from '../ip-table'
import { useNetworkState } from '../use-network-state'

jest.mock('../use-network-state')

const mockUseNetworkState = useNetworkState as jest.Mock

describe('IpTable', () => {
  it('should match a snapshot with ips', () => {
    expect(render(<IpTable />)).toMatchSnapshot()
  })

  it('should match a snapshot with no ips', () => {
    mockUseNetworkState.mockReturnValueOnce({
      ips: null,
    })

    expect(render(<IpTable />)).toMatchSnapshot()
  })

  it('should match a snapshot with ips loading', () => {
    mockUseNetworkState.mockReturnValueOnce({
      ipsLoading: true,
    })

    expect(render(<IpTable />)).toMatchSnapshot()
  })
})

describe('handleDeleteIp', () => {
  it('should handle deleting an account', async () => {
    const deleteIp = jest.fn(() => Promise.resolve(true))
    const refreshIps = jest.fn()
    const closeModal = jest.fn()
    const curried = handleDeleteIp(deleteIp, refreshIps, closeModal)

    curried()

    await Promise.resolve()

    expect(deleteIp).toHaveBeenCalledTimes(1)
    expect(refreshIps).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
