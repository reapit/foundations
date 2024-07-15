import React from 'react'
import { render } from '../../../tests/react-testing'
import { handleUpdateRule, RuleUpdateModal } from '../rule-update-modal'
import { mockRulesModel } from '../../../tests/__stubs__/network'

jest.mock('../use-network-state')

describe('RuleUpdateModal', () => {
  it('should match a snapshot', () => {
    expect(render(<RuleUpdateModal closeModal={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('handleUpdateRule', () => {
  it('should create an account successfully', async () => {
    const createRule = jest.fn(() => Promise.resolve(true))
    const refreshIps = jest.fn()
    const closeModal = jest.fn()

    const curried = handleUpdateRule(createRule, refreshIps, closeModal)

    await curried(mockRulesModel)

    expect(createRule).toHaveBeenCalledWith(mockRulesModel)
    expect(refreshIps).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
