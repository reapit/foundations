import React from 'react'
import { shallow } from 'enzyme'
import { notification } from '@reapit/elements'
import UpdateUserGroupModal, { UpdateUserGroupModalProps, onHandleSubmit } from '../edit-user-group'
import { addMemberToGroup, removeMemberFromGroup } from '../../../../services/user'

const filterProps = (): UpdateUserGroupModalProps => ({
  editingUserGroup: { id: 'Group Name', description: 'Group description' },
  setEditingUserGroup: jest.fn,
  onRefetchData: jest.fn,
})

jest.mock('../../../../core/connect-session')
jest.mock('../../../../services/user')

jest.spyOn(notification, 'error')
jest.spyOn(notification, 'success')

describe('UpdateUserGroupModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UpdateUserGroupModal {...filterProps()} />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  const handleOnClose = jest.fn
  const onRefetchData = jest.fn
  const mutate = jest.fn
  const editingUserGroup = { name: 'Group Name', description: 'Group description' }
  const userId = ['userid2', 'userid3', 'userid4']
  const initMembers = ['userid1', 'userid2']
  const onSubmit = onHandleSubmit(handleOnClose, onRefetchData, mutate, editingUserGroup, initMembers)

  it('should show notification success', async () => {
    await onSubmit({ userId })
    expect(addMemberToGroup).toHaveBeenCalledTimes(2)
    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(notification.success).toHaveBeenCalled()
    expect(notification.error).not.toHaveBeenCalled()
  })

  it('should show notification addMemberToGroup  error', async () => {
    ;(addMemberToGroup as jest.Mock).mockReturnValueOnce(false)
    await onSubmit({ userId })
    expect(notification.success).not.toHaveBeenCalled()
    expect(notification.error).toHaveBeenCalled()
  })

  it('should show notification addMemberToGroup  error', async () => {
    ;(removeMemberFromGroup as jest.Mock).mockReturnValueOnce(false)
    await onSubmit({ userId })
    expect(notification.success).not.toHaveBeenCalled()
    expect(notification.error).toHaveBeenCalled()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
