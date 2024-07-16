import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleSetRuleId, handleUpdateRule, RulesTable } from '../rules-table'
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

describe('handleSetRuleId', () => {
  it('should set the ruleId', () => {
    const setNetworkSelected = jest.fn()
    const ruleId = 'MOCK_ID'

    const curried = handleSetRuleId(setNetworkSelected, ruleId)

    curried()

    expect(setNetworkSelected.mock.calls[0][0]()['ruleId']).toEqual(ruleId)
  })
})

describe('handleUpdateRule', () => {
  it('should create an account successfully', async () => {
    const createRule = jest.fn(() => Promise.resolve(true))
    const refreshIps = jest.fn()
    const enabled = true
    const ruleId = 'MOCK_ID'

    const curried = handleUpdateRule(createRule, refreshIps, enabled, ruleId)

    await curried()

    expect(createRule).toHaveBeenCalledWith({ enabled }, { uriParams: { ruleId } })
    expect(refreshIps).toHaveBeenCalledTimes(1)
  })
})
