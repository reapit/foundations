import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockAppRevisionConsentModelResponse } from '../../../../tests/__stubs__/consents'
import { AppConsents, handleResendEmail, handleSendConstents, handleSetConsentId } from '../index'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [mockAppRevisionConsentModelResponse]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppConsents', () => {
  it('should match snapshot with consents', () => {
    expect(render(<AppConsents />)).toMatchSnapshot()
  })

  it('should match snapshot where there are no consents returned', () => {
    mockUseReapitGet.mockReturnValueOnce([[]])
    expect(render(<AppConsents />)).toMatchSnapshot()
  })

  it('should match snapshot where the app is loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true])
    expect(render(<AppConsents />)).toMatchSnapshot()
  })
})

describe('handleResendEmail', () => {
  it('should resend an email', async () => {
    const resendEmail = jest.fn(() => Promise.resolve<boolean>(true))
    const setConsentId = jest.fn()
    const appConsentsRefresh = jest.fn()
    const consentId = 'MOCK_CONSENT_ID'
    const developerEmail = 'mail@example.com'

    const curried = handleResendEmail(resendEmail, setConsentId, appConsentsRefresh, consentId, developerEmail)

    curried()

    await Promise.resolve<boolean>(true)

    expect(resendEmail).toHaveBeenCalledWith({ actionedBy: developerEmail })
    expect(appConsentsRefresh).toHaveBeenCalledTimes(1)
    expect(setConsentId).toHaveBeenCalledWith(null)
  })
})

describe('handleSetConsentId', () => {
  it('should set the consent id', () => {
    const setConsentId = jest.fn()
    const consentId = 'MOCK_CONSENT_ID'

    const curried = handleSetConsentId(setConsentId, consentId)

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
