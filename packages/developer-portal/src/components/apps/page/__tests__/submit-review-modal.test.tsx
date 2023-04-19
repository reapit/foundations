import { useReapitConnect } from '@reapit/connect-session'
import React from 'react'
import { render } from '../../../../tests/react-testing'
import { mockDeveloperModel } from '../../../../tests/__stubs__/developers'
import { getTitle, handleCloseModal, SubmitReviewModal } from '../submit-review-modal'

const mockUpdateDeveloper = jest.fn()
jest.mock('../../state/use-app-state')
jest.mock('../../../../core/use-global-state')

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [
    {
      data: [
        {
          name: 'Some Name',
          email: 'some@email.com',
        },
      ],
    },
  ]),
  useReapitUpdate: jest.fn(() => [false, undefined, mockUpdateDeveloper, false]),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      idToken: 'MOCK_TOKEN',
      loginIdentity: {
        developerId: 'MOCK_DEVELOPER_ID',
        agencyCloudId: 'SOM',
        groups: ['ReapitUser'],
      },
    },
  })),
}))

const mockUseReapitConnect = useReapitConnect as jest.Mock

describe('SubmitReviewModal', () => {
  it('should match a snapshot where not a customer', () => {
    mockUseReapitConnect.mockReturnValueOnce({
      connectSession: {
        idToken: 'MOCK_TOKEN',
        loginIdentity: {
          developerId: 'MOCK_DEVELOPER_ID',
          agencyCloudId: 'SBOX',
          groups: [],
        },
      },
    })
    expect(
      render(<SubmitReviewModal closeModal={jest.fn()} developer={mockDeveloperModel} refetchDeveloper={jest.fn()} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where a customer and status is pending', () => {
    expect(
      render(
        <SubmitReviewModal
          closeModal={jest.fn()}
          developer={{ ...mockDeveloperModel, status: 'pending' }}
          refetchDeveloper={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where a customer and status is incomplete and user not an admin', () => {
    expect(
      render(<SubmitReviewModal closeModal={jest.fn()} developer={mockDeveloperModel} refetchDeveloper={jest.fn()} />),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where a customer and status is incomplete and user is an admin', () => {
    expect(
      render(<SubmitReviewModal closeModal={jest.fn()} developer={mockDeveloperModel} refetchDeveloper={jest.fn()} />),
    ).toMatchSnapshot()
  })
})

describe('getTitle', () => {
  it('should return the correct title if the account is pending', () => {
    expect(getTitle(true, 'pending')).toEqual('Account Information is being verified')
  })

  it('should return the correct title if the user is not a customer', () => {
    expect(getTitle(false, 'incomplete')).toEqual('Account Information Required')
  })

  it('should return the correct title if the user is a customer but need to verify their account', () => {
    expect(getTitle(true, 'incomplete')).toEqual('Account Verification')
  })
})

describe('handleCloseModal', () => {
  it('should close the modal', () => {
    const closeModal = jest.fn()
    const refetchDeveloper = jest.fn()
    const curried = handleCloseModal(closeModal, refetchDeveloper, true)
    curried()
    expect(closeModal).toHaveBeenCalled()
    expect(refetchDeveloper).toHaveBeenCalled()
  })

  it('should not close the modal', () => {
    const closeModal = jest.fn()
    const refetchDeveloper = jest.fn()
    const curried = handleCloseModal(closeModal, refetchDeveloper, false)
    curried()
    expect(closeModal).not.toHaveBeenCalled()
    expect(refetchDeveloper).not.toHaveBeenCalled()
  })
})
