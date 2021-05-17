import React from 'react'
import { shallow } from 'enzyme'
import { notification } from '@reapit/elements'
import UpdateUserModal, { UpdateUserModalProps, onHandleSubmit } from '../edit-user'
import { UserModel } from '../../../../types/organisations-schema'
import { addMemberToGroup, removeMemberFromGroup } from '../../../../services/user'
import { toastMessages } from '../../../../constants/toast-messages'

const filterProps = (): UpdateUserModalProps => ({
  editingUser: { id: 'GR1', name: 'User Name', groups: ['OF1', 'OF2'] },
  setEditingUser: jest.fn,
  onRefetchData: jest.fn,
  orgId: 'SOME_ID',
})

jest.mock('../../../../core/connect-session')
jest.mock('../../../../services/user')

jest.spyOn(notification, 'error')
jest.spyOn(notification, 'success')
jest.mock('swr', () =>
  jest.fn(() => ({
    data: require('../__stubs__/user-groups').data,
  })),
)
describe('UpdateUserModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UpdateUserModal {...filterProps()} />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  it('should correctly add and remove users from groups', async () => {
    const handleOnClose = jest.fn()
    const onRefetchData = jest.fn()
    const userId = 'USER_ID'
    const currentGroupIds = ['ID_1', 'ID_2']
    const newGroupIds = ['ID_1', 'ID_3']
    const editingUser = { groups: currentGroupIds, id: userId } as UserModel
    const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, editingUser)

    await onSubmit({ groupIds: newGroupIds })

    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(removeMemberFromGroup).toHaveBeenCalledWith({ id: 'ID_2', userId })

    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_3' })

    expect(notification.success).toHaveBeenCalledTimes(1)
    expect(notification.success).toHaveBeenCalledWith({ message: toastMessages.CHANGES_SAVE_SUCCESS })

    expect(notification.error).not.toHaveBeenCalled()
  })

  it('should correctly show an error message if an API call fails', async () => {
    ;(addMemberToGroup as jest.Mock).mockReturnValue(null)
    const handleOnClose = jest.fn()
    const onRefetchData = jest.fn()
    const userId = 'USER_ID'
    const currentGroupIds = ['ID_1', 'ID_2']
    const newGroupIds = ['ID_1', 'ID_3']
    const editingUser = { groups: currentGroupIds, id: userId } as UserModel
    const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, editingUser)

    await onSubmit({ groupIds: newGroupIds })

    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(removeMemberFromGroup).toHaveBeenCalledWith({ id: 'ID_2', userId })

    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_3' })

    expect(notification.success).not.toHaveBeenCalled()

    expect(notification.error).toHaveBeenCalledTimes(1)
    expect(notification.error).toHaveBeenCalledWith({ message: toastMessages.FAILED_TO_EDIT_USER })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
