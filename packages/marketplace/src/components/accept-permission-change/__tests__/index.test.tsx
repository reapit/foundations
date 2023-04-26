import React from 'react'
import { render } from '../../../tests/react-testing'
import { AcceptPermissionChangePage, handleApprove, handleCancel, handleOpenModal } from '../index'
import { RoutePaths } from '../../../constants/routes'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [mockAppDetailModel]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
}))

describe('AcceptPermissionChangePage', () => {
  it('should match snapshot ', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)
    expect(render(<AcceptPermissionChangePage />)).toMatchSnapshot()
  })
})

describe('handleApprove', () => {
  it('should approve a permission change', async () => {
    const resendEmail = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
    const closeModal = jest.fn()
    const navigate = jest.fn()
    const email = 'mail@example.com'

    const curried = handleApprove(resendEmail, closeModal, navigate, email)

    await curried()

    expect(resendEmail).toHaveBeenCalledWith({ approvedBy: email })
    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(RoutePaths.APPS_INSTALLED)
  })
})

describe('handleCancel', () => {
  it('should ignore a permission change', () => {
    const closeModal = jest.fn()
    const navigate = jest.fn()

    const curried = handleCancel(closeModal, navigate)

    curried()

    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith(RoutePaths.APPS_INSTALLED)
  })
})

describe('handleOpenModal', () => {
  it('should open the modal', () => {
    const openModal = jest.fn()

    const curried = handleOpenModal(openModal)

    curried()

    expect(openModal).toHaveBeenCalledTimes(1)
  })
})
