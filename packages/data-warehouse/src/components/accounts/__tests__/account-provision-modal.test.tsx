import { ReapitConnectSession } from '@reapit/connect-session'
import React from 'react'
import { getAccountService } from '../../../services/accounts'
import { render } from '../../../tests/react-testing'
import { mockAccountModelPagedResult } from '../../../tests/__stubs__/accounts'
import { AccountCreateModel } from '../../../types/accounts'
import { AccountProvisionModal, handleCreateAccount, handlePolling } from '../account-provision-modal'

jest.mock('../../../services/accounts', () => ({
  getAccountService: jest.fn(() => mockAccountModelPagedResult._embedded[0]),
}))

const mockGetAccountService = getAccountService as jest.Mock

describe('AccountProvisionModal', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AccountProvisionModal
          setProvisionInProgress={jest.fn()}
          setPercentageComplete={jest.fn()}
          closeModal={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})

describe('handlePolling', () => {
  it('should handle polling when account is provisioned', async () => {
    const result = await handlePolling('MOCK_ID')

    expect(result.provisioned).toEqual(true)
  })

  it('should handle polling when account is not provisioned', async () => {
    mockGetAccountService.mockReturnValue({
      ...mockAccountModelPagedResult._embedded[0],
      status: 'An error was encountered when creating this account',
    })
    const result = await handlePolling('MOCK_ID')

    expect(result.provisioned).toEqual(false)
  })
})

describe('handleCreateAccount', () => {
  it('should create an account successfully', async () => {
    const setProvisionInProgress = jest.fn()
    const createAccount = jest.fn(() => Promise.resolve(true))
    const closeModal = jest.fn()
    const connectSession = {
      loginIdentity: {
        orgId: 'MOCK_ID',
        orgName: 'MOCK_NAME',
      },
    } as unknown as ReapitConnectSession
    const account = {
      password: 'MOCK_PASSWORD',
      username: 'MOCK_USERNAME',
      isAdmin: false,
      devMode: false,
    } as AccountCreateModel

    const curried = handleCreateAccount(setProvisionInProgress, createAccount, closeModal, connectSession)

    await curried(account)

    expect(createAccount).toHaveBeenCalledWith({
      ...account,
      organisationId: connectSession.loginIdentity.orgId,
      organisationName: connectSession.loginIdentity.orgName,
    })

    expect(setProvisionInProgress).toHaveBeenCalledTimes(1)
    expect(setProvisionInProgress).toHaveBeenLastCalledWith(true)
    expect(closeModal).not.toHaveBeenCalled()
  })

  it('should handle create account failure', async () => {
    const setProvisionInProgress = jest.fn()
    const createAccount = jest.fn(() => Promise.resolve(false))
    const closeModal = jest.fn()
    const connectSession = {
      loginIdentity: {
        orgId: 'MOCK_ID',
        orgName: 'MOCK_NAME',
      },
    } as unknown as ReapitConnectSession
    const account = {
      password: 'MOCK_PASSWORD',
      username: 'MOCK_USERNAME',
      isAdmin: false,
      devMode: false,
    } as AccountCreateModel

    const curried = handleCreateAccount(setProvisionInProgress, createAccount, closeModal, connectSession)

    await curried(account)

    expect(createAccount).toHaveBeenCalledWith({
      ...account,
      organisationId: connectSession.loginIdentity.orgId,
      organisationName: connectSession.loginIdentity.orgName,
    })

    expect(setProvisionInProgress).toHaveBeenCalledTimes(2)
    expect(setProvisionInProgress).toHaveBeenLastCalledWith(false)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
