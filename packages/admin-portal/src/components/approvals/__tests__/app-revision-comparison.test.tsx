import React from 'react'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/use-reapit-data'
import { LoginIdentity } from '@reapit/connect-session'
import dayjs from 'dayjs'
import {
  handleApproveRevision,
  handleRejectRevision,
  handleRefreshApprovals,
  handleSendConstents,
  AppRevisionComparison,
} from '../app-revision-comparison'
import { render } from '../../../tests/react-testing'
import { mockApprovalModelPagedResult } from '../../../tests/__stubs__/approvals'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { mockAppRevisionModel } from '../../../tests/__stubs__/revisions'
import { mockDesktopIntegrationTypeModelPagedResult } from '../../../tests/__stubs__/desktop-integration-types'
import { mockScopeModel } from '../../../tests/__stubs__/scopes'

jest.mock('../../../core/use-permissions-state')
jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false, undefined, jest.fn()]),
  useReapitUpdate: jest.fn(() => [null, false, undefined, jest.fn]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppRevisionComparison', () => {
  it('should render a component with no approvals or data', () => {
    expect(render(<AppRevisionComparison approval={null} refreshApprovals={jest.fn()} />)).toMatchSnapshot()
  })

  it('should render a component with approval props and data where the revision has changed', () => {
    mockUseReapitGet
      .mockReturnValueOnce([mockAppDetailModel, false, null, jest.fn()])
      .mockReturnValueOnce([mockAppRevisionModel, false, null, jest.fn()])
      .mockReturnValueOnce([mockDesktopIntegrationTypeModelPagedResult, false, null, jest.fn()])
      .mockReturnValueOnce([mockScopeModel, false, null, jest.fn()])

    expect(
      render(
        <AppRevisionComparison
          approval={(mockApprovalModelPagedResult.data as Marketplace.ApprovalModel[])[0]}
          refreshApprovals={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should render a component with approval props and data where the revision has reversed', () => {
    mockUseReapitGet
      .mockReturnValueOnce([mockAppRevisionModel, false, null, jest.fn()])
      .mockReturnValueOnce([mockAppDetailModel, false, null, jest.fn()])
      .mockReturnValueOnce([mockDesktopIntegrationTypeModelPagedResult, false, null, jest.fn()])
      .mockReturnValueOnce([mockScopeModel, false, null, jest.fn()])

    expect(
      render(
        <AppRevisionComparison
          approval={(mockApprovalModelPagedResult.data as Marketplace.ApprovalModel[])[0]}
          refreshApprovals={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should render a component with approval props and data where the revision has not changed', () => {
    mockUseReapitGet
      .mockReturnValueOnce([mockAppDetailModel, false, null, jest.fn()])
      .mockReturnValueOnce([mockAppDetailModel, false, null, jest.fn()])
      .mockReturnValueOnce([mockDesktopIntegrationTypeModelPagedResult, false, null, jest.fn()])
      .mockReturnValueOnce([mockScopeModel, false, null, jest.fn()])

    expect(
      render(
        <AppRevisionComparison
          approval={(mockApprovalModelPagedResult.data as Marketplace.ApprovalModel[])[0]}
          refreshApprovals={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handleApproveRevision', () => {
  it('handleApproveRevision should correctly approve a revision', () => {
    const approveRevision = jest.fn()
    const closeModal = jest.fn()
    const loginIdentity = {
      email: 'email',
      name: 'name',
    } as LoginIdentity
    const curried = handleApproveRevision(approveRevision, closeModal, loginIdentity)

    curried()

    expect(approveRevision).toHaveBeenCalledWith({
      email: loginIdentity.email,
      name: loginIdentity.name,
      publicListedDate: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
    })
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleRejectRevision', () => {
  it('handleRejectRevision should correctly reject a revision', () => {
    const rejectRevision = jest.fn()
    const closeModal = jest.fn()
    const loginIdentity = {
      email: 'email',
      name: 'name',
    } as LoginIdentity

    const curried = handleRejectRevision(rejectRevision, closeModal, loginIdentity)

    curried({ rejectionReason: 'reason' })

    expect(rejectRevision).toHaveBeenCalledWith({
      email: loginIdentity.email,
      name: loginIdentity.name,
      rejectionReason: 'reason',
    })
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleRefreshApprovals', () => {
  it('handleRefreshApprovals should correctly refresh approvals', () => {
    const refreshApprovals = jest.fn()
    const shouldRefresh = true
    const curried = handleRefreshApprovals(refreshApprovals, shouldRefresh)

    curried()

    expect(refreshApprovals).toHaveBeenCalledTimes(1)
  })
})

describe('handleSendConstents', () => {
  it('handleSendConstents should correctly send consents', () => {
    const createConsentEmails = jest.fn()
    const email = 'mail@example.com'
    const curried = handleSendConstents(createConsentEmails, email)

    curried()

    expect(createConsentEmails).toHaveBeenCalledWith({
      actionedBy: email,
    })
  })
})
