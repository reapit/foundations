import React from 'react'
import { shallow } from 'enzyme'
import UpdateUserModal, { EditUserFormProps, onHandleSubmit } from '../edit-user'
import { UserModel } from '../../../../types/organisations-schema'
import { addMemberToGroup, removeMemberFromGroup } from '../../../../services/user'

const filterProps = (): EditUserFormProps => ({
  user: { id: 'GR1', name: 'User Name', groups: ['OF1', 'OF2'] },
  onComplete: jest.fn(),
  orgId: 'SOME_ID',
})

jest.mock('../../../../core/connect-session')
jest.mock('../../../../services/user')

jest.mock('swr', () =>
  jest.fn(() => ({
    data: require('../__stubs__/user-groups').data,
  })),
)
describe('UpdateUserModal', () => {
  it('should match a snapshot', () => {
    window.reapit.config.groupIdsWhitelist = ['OF1', 'OF2']
    expect(shallow(<UpdateUserModal {...filterProps()} />)).toMatchSnapshot()
  })
})

describe('onHandleSubmit', () => {
  it('should correctly add and remove users from groups', async () => {
    const onComplete = jest.fn()
    const success = jest.fn()
    const error = jest.fn()
    const userId = 'USER_ID'
    const currentGroupIds = ['ID_1', 'ID_2']
    const newGroupIds = 'ID_1,ID_3'
    const user = { groups: currentGroupIds, id: userId } as UserModel
    const onSubmit = onHandleSubmit(onComplete, user, success, error)

    await onSubmit({ groupIds: newGroupIds })

    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(removeMemberFromGroup).toHaveBeenCalledWith({ id: 'ID_2', userId })

    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_3' })
  })

  it('should correctly show an error message if an API call fails', async () => {
    ;(addMemberToGroup as jest.Mock).mockReturnValue(null)
    const onComplete = jest.fn()
    const success = jest.fn()
    const error = jest.fn()
    const userId = 'USER_ID'
    const currentGroupIds = ['ID_1', 'ID_2']
    const newGroupIds = 'ID_1,ID_3'
    const user = { groups: currentGroupIds, id: userId } as UserModel
    const onSubmit = onHandleSubmit(onComplete, user, success, error)

    await onSubmit({ groupIds: newGroupIds })

    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(removeMemberFromGroup).toHaveBeenCalledWith({ id: 'ID_2', userId })

    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_3' })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
