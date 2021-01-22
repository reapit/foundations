import React from 'react'
import { shallow } from 'enzyme'
import { notification } from '@reapit/elements'
import UpdateUserGroupModal, { UpdateUserGroupModalProps, onHandleSubmit, getUserOptions } from '../edit-user-group'
import { addMemberToGroup, removeMemberFromGroup } from '../../../../services/user'
import { listUserGroup, listUserGroupMember } from '../__stubs__/user-groups'

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
  const userId = ['id2', 'id3', 'id4']
  const removeUser = ['id1']
  const onSubmit = onHandleSubmit(
    handleOnClose,
    onRefetchData,
    mutate,
    removeUser,
    listUserGroupMember,
    editingUserGroup,
  )

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

describe('getUserOptions', () => {
  it('should return right result', () => {
    const res = getUserOptions(listUserGroup, listUserGroupMember)
    expect(res).toEqual([
      {
        id: 'id2',
        description: 'description 2',
      },
      {
        id: 'id4',
        description: 'description 4',
      },
    ])
  })
})
