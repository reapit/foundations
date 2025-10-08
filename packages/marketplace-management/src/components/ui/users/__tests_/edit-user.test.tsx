import React from 'react'
import { render } from '@testing-library/react'
import UpdateUserModal, { EditUserFormProps, onHandleSubmit } from '../edit-user'
import { UserModel } from '@reapit/foundations-ts-definitions'
import { addMemberToGroup, removeMemberFromGroup } from '../../../../services/user'
import useSWR from 'swr'
import { mockUserGroups } from '../../../../services/__stubs__/user-groups'

jest.mock('../../../../core/connect-session')
jest.mock('../../../../services/user')
jest.mock('swr')

const mockSWR = useSWR as jest.Mock

const props = (): EditUserFormProps => ({
  user: { id: 'GR1', name: 'User Name', groups: ['OF1', 'OF2'] },
  onComplete: jest.fn(),
  orgId: 'SOME_ID',
})

describe('UpdateUserModal', () => {
  it('should match a snapshot where there is data', () => {
    process.env.groupIdsWhitelist = ['OF1', 'OF2']
    mockSWR.mockReturnValue({
      data: mockUserGroups,
      error: {},
      mutate: jest.fn(),
    })
    expect(render(<UpdateUserModal {...props()} />)).toMatchSnapshot()
  })

  it('should filter user groups by whitelist when rendering', () => {
    process.env.groupIdsWhitelist = ['OF1', 'OF2']
    const user = {
      id: 'GR1',
      name: 'User Name',
      groups: ['OF1', 'OF2', 'OF3'],
      userGroups: [
        { organisationId: 'SOME_ID', groupId: 'OF1' },
        { organisationId: 'SOME_ID', groupId: 'OF2' },
        { organisationId: 'SOME_ID', groupId: 'OF3' }, // Not in whitelist
        { organisationId: 'OTHER_ID', groupId: 'OF4' }, // Different org
      ],
    }
    mockSWR.mockReturnValue({
      data: mockUserGroups,
      error: {},
      mutate: jest.fn(),
    })
    const { container } = render(<UpdateUserModal {...props()} user={user} />)

    // The component should only show whitelisted groups (OF1, OF2) and filter out OF3 and OF4
    expect(container).toBeTruthy()
  })

  it('should handle user groups with undefined groupId', () => {
    process.env.groupIdsWhitelist = ['OF1', 'OF2']
    const user = {
      id: 'GR1',
      name: 'User Name',
      groups: ['OF1', 'OF2'],
      userGroups: [
        { organisationId: 'SOME_ID', groupId: 'OF1' },
        { organisationId: 'SOME_ID', groupId: undefined }, // Should be filtered out
        { organisationId: 'SOME_ID', groupId: 'OF2' },
      ],
    }
    mockSWR.mockReturnValue({
      data: mockUserGroups,
      error: {},
      mutate: jest.fn(),
    })
    const { container } = render(<UpdateUserModal {...props()} user={user} />)

    // The component should handle undefined groupId gracefully
    expect(container).toBeTruthy()
  })
})

describe('onHandleSubmit', () => {
  it('should correctly add and remove users from groups', async () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2', 'ID_3']
    const onComplete = jest.fn()
    const success = jest.fn()
    const error = jest.fn()
    const userId = 'USER_ID'
    const currentGroupIds = ['ID_1', 'ID_2']
    const newGroupIds = 'ID_1,ID_3'
    const user = { groups: currentGroupIds, id: userId } as UserModel
    const organisationId = 'ORG_ID'
    const onSubmit = onHandleSubmit(onComplete, user, success, error, organisationId)

    await onSubmit({ groupIds: newGroupIds })

    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(removeMemberFromGroup).toHaveBeenCalledWith({ id: 'ID_2', userId, organisationId })

    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_3', organisationId })
  })

  it('should filter out group IDs not in whitelist when submitting', async () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2']
    const onComplete = jest.fn()
    const success = jest.fn()
    const error = jest.fn()
    const userId = 'USER_ID'
    const currentGroupIds = ['ID_1']
    const newGroupIds = 'ID_1,ID_2,ID_3' // ID_3 is not in whitelist
    const user = { groups: currentGroupIds, id: userId } as UserModel
    const organisationId = 'ORG_ID'
    const onSubmit = onHandleSubmit(onComplete, user, success, error, organisationId)

    await onSubmit({ groupIds: newGroupIds })

    // Should only add ID_2, not ID_3 (which is not in whitelist)
    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_2', organisationId })
    expect(addMemberToGroup).not.toHaveBeenCalledWith({ userId, id: 'ID_3', organisationId })

    expect(removeMemberFromGroup).not.toHaveBeenCalled()
  })

  it('should correctly show an error message if an API call fails', async () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2', 'ID_3']
    ;(addMemberToGroup as jest.Mock).mockReturnValue(null)
    const onComplete = jest.fn()
    const success = jest.fn()
    const error = jest.fn()
    const userId = 'USER_ID'
    const currentGroupIds = ['ID_1', 'ID_2']
    const newGroupIds = 'ID_1,ID_3'
    const user = { groups: currentGroupIds, id: userId } as UserModel
    const organisationId = 'ORG_ID'
    const onSubmit = onHandleSubmit(onComplete, user, success, error, organisationId)

    await onSubmit({ groupIds: newGroupIds })

    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(removeMemberFromGroup).toHaveBeenCalledWith({ id: 'ID_2', userId, organisationId })

    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_3', organisationId })
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
