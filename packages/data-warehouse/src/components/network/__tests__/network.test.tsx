import React from 'react'
import { render } from '../../../tests/react-testing'
import { Network } from '../network'
import { useNetworkState } from '../use-network-state'

const mockUseNetworkState = useNetworkState as jest.Mock

describe('Network', () => {
  it('should match a snapshot with rules', () => {
    expect(render(<Network />)).toMatchSnapshot()
  })

  it('should match a snapshot with no rules', () => {
    mockUseNetworkState.mockReturnValueOnce({
      rules: null,
    })
    expect(render(<Network />)).toMatchSnapshot()
  })

  it('should match a snapshot with rules loading', () => {
    mockUseNetworkState.mockReturnValueOnce({
      rulesLoading: true,
    })
    expect(render(<Network />)).toMatchSnapshot()
  })
})
