import React, { FC } from 'react'
import { developerStub } from '../../../../sagas/__stubs__/developer'
import { render } from '../../../../tests/react-testing'
import { getTitle, handleCloseModal, SubmitAppModal, SubmitAppModalContent } from '../submit-app-modal'

const mockUpdateDeveloper = jest.fn()

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: () => [
    {
      data: [
        {
          name: 'Some Name',
          email: 'some@email.com',
        },
      ],
    },
  ],
  useReapitUpdate: () => [false, undefined, mockUpdateDeveloper, false],
}))

describe('SubmitAppModal', () => {
  it('should match a snapshot', () => {
    const Modal: FC = () => <div></div>
    expect(render(<SubmitAppModal Modal={Modal} closeModal={jest.fn()} setIsListing={jest.fn()} />)).toMatchSnapshot()
  })
})

describe('SubmitAppModalContent', () => {
  it('should match a snapshot where not a customer', () => {
    expect(
      render(
        <SubmitAppModalContent
          isCustomer={false}
          userRole="admin"
          orgStatus="incomplete"
          closeModal={jest.fn()}
          setIsListing={jest.fn()}
          currentOrganisation={developerStub}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where a customer and status is pending', () => {
    expect(
      render(
        <SubmitAppModalContent
          isCustomer={true}
          userRole="admin"
          orgStatus="pending"
          closeModal={jest.fn()}
          setIsListing={jest.fn()}
          currentOrganisation={developerStub}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where a customer and status is incomplete and user not an admin', () => {
    expect(
      render(
        <SubmitAppModalContent
          isCustomer={true}
          userRole="user"
          orgStatus="incomplete"
          closeModal={jest.fn()}
          setIsListing={jest.fn()}
          currentOrganisation={developerStub}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot where a customer and status is incomplete and user is an admin', () => {
    expect(
      render(
        <SubmitAppModalContent
          isCustomer={true}
          userRole="admin"
          orgStatus="incomplete"
          closeModal={jest.fn()}
          setIsListing={jest.fn()}
          currentOrganisation={developerStub}
        />,
      ),
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
    const curried = handleCloseModal(closeModal, true)
    curried()
    expect(closeModal).toHaveBeenCalled()
  })

  it('should not close the modal', () => {
    const closeModal = jest.fn()
    const curried = handleCloseModal(closeModal, false)
    curried()
    expect(closeModal).not.toHaveBeenCalled()
  })
})
