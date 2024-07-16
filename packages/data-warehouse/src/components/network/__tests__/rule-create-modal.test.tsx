import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleCreateRule, RuleCreateModal } from '../rule-create-modal'
import { mockRulesModel } from '../../../tests/__stubs__/network'

jest.mock('../use-network-state')

describe('RuleCreateModal', () => {
  it('should match a snapshot', () => {
    expect(render(<RuleCreateModal closeModal={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleCreateRule', () => {
  it('should create an account successfully', async () => {
    const createRule = jest.fn(() => Promise.resolve(true))
    const refreshIps = jest.fn()
    const closeModal = jest.fn()
    const setNetworkSelected = jest.fn()

    const curried = handleCreateRule(createRule, refreshIps, closeModal, setNetworkSelected)

    await curried(mockRulesModel)

    expect(createRule).toHaveBeenCalledWith(mockRulesModel)
    expect(refreshIps).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(setNetworkSelected).toHaveBeenCalledWith({ ruleId: null, ipRuleId: null, ipId: null })
  })
})
