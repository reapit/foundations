import React from 'react'
import { render } from '../../../tests/react-testing'
import { RulesTable } from '../rules-table'
import { useNetworkState } from '../use-network-state'

jest.mock('../use-network-state')

const mockUseNetworkState = useNetworkState as jest.Mock

describe('RulesTable', () => {
  it('should match a snapshot with rules', () => {
    expect(render(<RulesTable />)).toMatchSnapshot()
  })

  it('should match a snapshot with no rules', () => {
    mockUseNetworkState.mockReturnValueOnce({
      rules: null,
    })

    expect(render(<RulesTable />)).toMatchSnapshot()
  })

  it('should match a snapshot with rules loading', () => {
    mockUseNetworkState.mockReturnValueOnce({
      rulesLoading: true,
    })

    expect(render(<RulesTable />)).toMatchSnapshot()
  })
})
