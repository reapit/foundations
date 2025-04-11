import React from 'react'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/use-reapit-data'
import { handleSetConsentApproval, handleSetDiffApproval, AdminApprovals } from '../index'
import { render } from '../../../tests/react-testing'
import { mockApprovalModelPagedResult } from '../../../tests/__stubs__/approvals'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockApprovalModelPagedResult, false, undefined, jest.fn()]),
}))

jest.mock('../../../core/use-permissions-state')

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AdminApprovals', () => {
  it('should render component with data', () => {
    expect(render(<AdminApprovals />)).toMatchSnapshot()
  })

  it('should render component when loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true, null, jest.fn()])
    expect(render(<AdminApprovals />)).toMatchSnapshot()
  })
})

describe('handleSetConsentApproval', () => {
  it('handleSetConsentApproval should return expected output', () => {
    const setConsentApproval = jest.fn()
    const setDiffApproval = jest.fn()
    const approval = (mockApprovalModelPagedResult?.data as Marketplace.ApprovalModel[])[0]
    const curried = handleSetConsentApproval(setConsentApproval, setDiffApproval, approval)

    curried()

    expect(setDiffApproval).toHaveBeenCalledWith(null)
    expect(setConsentApproval).toHaveBeenCalledWith(approval)
  })
})

describe('handleSetDiffApproval', () => {
  it('handleSetConsentApproval should return expected output', () => {
    const setConsentApproval = jest.fn()
    const setDiffApproval = jest.fn()
    const approval = (mockApprovalModelPagedResult?.data as Marketplace.ApprovalModel[])[0]
    const curried = handleSetDiffApproval(setDiffApproval, setConsentApproval, approval)

    curried()

    expect(setDiffApproval).toHaveBeenCalledWith(approval)
    expect(setConsentApproval).toHaveBeenCalledWith(null)
  })
})
