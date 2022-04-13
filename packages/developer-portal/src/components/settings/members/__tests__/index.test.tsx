import React from 'react'
import { getIntentFromStatus, SettingsMembersPage } from '..'
import { render } from '../../../../tests/react-testing'
import { mockMembersPagedResult } from '../../../../tests/__stubs__/members'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockMembersPagedResult, true]),
  useReapitUpdate: jest.fn(() => []),
}))

describe('SettingsMembersPage', () => {
  it('should match snapshot', () => {
    expect(render(<SettingsMembersPage />)).toMatchSnapshot()
  })
})

describe('getIntentFromStatus', () => {
  const statuses = [
    { status: 'active', intent: 'success' },
    { status: 'rejected', intent: 'danger' },
    { status: 'pending', intent: 'critical' },
    { status: 'any', intent: 'low' },
  ]

  statuses.forEach((status) => {
    it(`should return the intent for ${status}`, () => {
      expect(getIntentFromStatus(status.status)).toEqual(status.intent)
    })
  })
})
