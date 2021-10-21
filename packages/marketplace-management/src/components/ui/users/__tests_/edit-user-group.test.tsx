import React from 'react'
import { shallow } from 'enzyme'
import UpdateUserGroupModal, { EditUserGroupFormProps, onHandleSubmit } from '../edit-user-group'
import { addMemberToGroup, removeMemberFromGroup } from '../../../../services/user'
// import { listUserGroup, listUserGroupMember } from '../__stubs__/user-groups'

const filterProps = (): EditUserGroupFormProps => ({
  userGroup: { id: 'Group Name', description: 'Group description' },
  onComplete: jest.fn,
  orgId: 'SOME_ID',
})

jest.mock('../../../../core/connect-session')
jest.mock('../../../../services/user')

describe('UpdateUserGroupModal', () => {
  it('should match a snapshot', () => {
    expect(shallow(<UpdateUserGroupModal {...filterProps()} />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  const onComplete = jest.fn()
  const refetchMembers = jest.fn()
  const success = jest.fn()
  const error = jest.fn()
  const userIds = 'id2,id3,id4'
  const originalUserIds = ['id1', 'id2', 'id3']
  const userGroupId = 'id1'
  const onSubmit = onHandleSubmit(onComplete, refetchMembers, success, error, originalUserIds, userGroupId)

  it('should show notification success', async () => {
    await onSubmit({ userIds })
    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(success).toHaveBeenCalled()
    expect(error).not.toHaveBeenCalled()
  })

  it('should show notification addMemberToGroup  error', async () => {
    ;(addMemberToGroup as jest.Mock).mockReturnValueOnce(false)
    await onSubmit({ userIds })
    expect(success).not.toHaveBeenCalled()
    expect(error).toHaveBeenCalled()
  })

  it('should show notification addMemberToGroup  error', async () => {
    ;(removeMemberFromGroup as jest.Mock).mockReturnValueOnce(false)
    await onSubmit({ userIds })
    expect(success).not.toHaveBeenCalled()
    expect(error).toHaveBeenCalled()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
