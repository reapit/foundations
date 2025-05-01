import { Marketplace } from '@reapit/foundations-ts-definitions'
import { useReapitGet } from '@reapit/use-reapit-data'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockApprovalModelPagedResult } from '../../../tests/__stubs__/approvals'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { mockAppRevisionConsentModelResponse } from '../../../tests/__stubs__/consents'
import { mockAppRevisionModel } from '../../../tests/__stubs__/revisions'
import {
  AppConsents,
  handleCloseModal,
  handleSendConstents,
  handleSetConsentId,
  handleSetResendConsents,
} from '../index'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockAppRevisionConsentModelResponse]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppConsents', () => {
  it('should match snapshot with consents and an approval', () => {
    mockUseReapitGet
      .mockReturnValueOnce([mockAppDetailModel])
      .mockReturnValueOnce([mockAppRevisionModel])
      .mockReturnValueOnce([mockAppRevisionConsentModelResponse])
    expect(
      render(<AppConsents approval={mockApprovalModelPagedResult.data as Marketplace.ApprovalModel[][0]} />),
    ).toMatchSnapshot()
  })

  it('should match snapshot where there are no consents returned', () => {
    mockUseReapitGet
      .mockReturnValueOnce([mockAppDetailModel])
      .mockReturnValueOnce([mockAppRevisionModel])
      .mockReturnValueOnce([null])
    expect(
      render(<AppConsents approval={mockApprovalModelPagedResult.data as Marketplace.ApprovalModel[][0]} />),
    ).toMatchSnapshot()
  })

  it('should match snapshot where nothing is returned', () => {
    mockUseReapitGet.mockReturnValueOnce([null]).mockReturnValueOnce([null]).mockReturnValueOnce([null])
    expect(
      render(<AppConsents approval={mockApprovalModelPagedResult.data as Marketplace.ApprovalModel[][0]} />),
    ).toMatchSnapshot()
  })

  it('should match snapshot where the app is loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(
      render(<AppConsents approval={mockApprovalModelPagedResult.data as Marketplace.ApprovalModel[][0]} />),
    ).toMatchSnapshot()
  })
})

describe('handleSetConsentId', () => {
  it('should set the consent id', () => {
    const setConsentId = jest.fn()
    const consentId = 'MOCK_CONSENT_ID'

    const curried = handleSetConsentId(setConsentId, () => {}, consentId)

    curried()

    expect(setConsentId).toHaveBeenCalledWith(consentId)
  })
})

describe('handleSendConstents', () => {
  it('should send the consents emails', async () => {
    const createConsentEmails = jest.fn(() => Promise.resolve<boolean>(true))
    const appConsentsRefresh = jest.fn()
    const developerEmail = 'mail@example.com'

    const curried = handleSendConstents(createConsentEmails, appConsentsRefresh, developerEmail)

    await curried()

    expect(createConsentEmails).toHaveBeenCalledWith({ actionedBy: developerEmail })
    expect(appConsentsRefresh).toHaveBeenCalledTimes(1)
  })
})

describe('handleSetResendConsents', () => {
  it('should resend the consents emails', () => {
    const setSelectedConsent = jest.fn(() => Promise.resolve<boolean>(true))
    const consent = mockAppRevisionConsentModelResponse[0]
    const openModal = jest.fn()

    const curried = handleSetResendConsents(setSelectedConsent, consent, openModal)

    curried()

    expect(setSelectedConsent).toHaveBeenCalledWith(consent)
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleCloseModal', () => {
  it('should close the modal', () => {
    const setSelectedConsent = jest.fn()
    const closeModal = jest.fn()
    const emailResent = true

    const curried = handleCloseModal(setSelectedConsent, closeModal, emailResent)

    curried()

    expect(setSelectedConsent).toHaveBeenCalledWith(null)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
