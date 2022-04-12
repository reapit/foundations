import React from 'react'
import { render } from '../../../tests/react-testing'
import { CustomerRegister, handleCreateAccount, handleSetModal } from '../customer-register'
import { ReapitConnectSession, useReapitConnect } from '@reapit/connect-session'
import { COGNITO_GROUP_ADMIN_USERS, COGNITO_GROUP_USERS } from '../../../utils/auth'

jest.mock('@reapit/connect-session')

const mockUseReapitConnect = useReapitConnect as jest.Mock

describe('CustomerRegister', () => {
  it('should match a snapshot where hasDeveloperOrg', () => {
    mockUseReapitConnect.mockReturnValue({
      connectSession: {
        loginIdentity: {
          orgName: 'Some Org',
          developerId: 'SOME_ID',
          groups: [],
        },
      },
    })
    expect(render(<CustomerRegister />)).toMatchSnapshot()
  })

  it('should match a snapshot where hasDeveloperOrg is false, isCustomer but not admin', () => {
    mockUseReapitConnect.mockReturnValue({
      connectSession: {
        loginIdentity: {
          orgName: 'Some Org',
          developerId: null,
          agencyCloudId: 'SOME_ID',
          groups: [COGNITO_GROUP_USERS],
        },
      },
    })
    expect(render(<CustomerRegister />)).toMatchSnapshot()
  })

  it('should match a snapshot where hasDeveloperOrg is false and isCustomerAdmin', () => {
    mockUseReapitConnect.mockReturnValue({
      connectSession: {
        loginIdentity: {
          orgName: 'Some Org',
          developerId: null,
          agencyCloudId: 'SOME_ID',
          groups: [COGNITO_GROUP_ADMIN_USERS],
        },
      },
    })
    expect(render(<CustomerRegister />)).toMatchSnapshot()
  })
})

describe('handleSetModal', () => {
  it('should set the modal', () => {
    const termsModalVisible = true
    const setTermsModalVisible = jest.fn()

    const curried = handleSetModal(termsModalVisible, setTermsModalVisible)

    curried()

    expect(setTermsModalVisible).toHaveBeenCalledWith(termsModalVisible)
  })
})

describe('handleCreateAccount', () => {
  it('should set the modal', async () => {
    const updateCustomer = jest.fn(() => new Promise<boolean | null>((resolve) => resolve(true)))
    const createDeveloper = jest.fn(() => new Promise<boolean | null>((resolve) => resolve(true)))
    const connectSession = {
      loginIdentity: {
        orgName: 'Some Org',
        developerId: null,
        email: 'mail@test.com',
        name: 'Joe Dev',
        agencyCloudId: 'SOME_ID',
        groups: [COGNITO_GROUP_ADMIN_USERS],
      },
    } as ReapitConnectSession

    const curried = handleCreateAccount(updateCustomer, createDeveloper, connectSession)

    curried()

    await new Promise((resolve) => resolve(true))

    expect(updateCustomer).toHaveBeenCalledWith({
      accountApproved: '2019-10-10T22:39:51+00:00',
      accountApprovedEmail: 'mail@test.com',
    })

    expect(createDeveloper).toHaveBeenCalledWith({
      agreedTerms: '2019-10-10T22:39:51+00:00',
      name: connectSession.loginIdentity.name,
      companyName: connectSession.loginIdentity.orgName,
      email: connectSession.loginIdentity.email,
    })
  })
})
