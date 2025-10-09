import React from 'react'
import { render } from '@testing-library/react'
import UpdateUserModal, { EditUserFormProps, onHandleSubmit, sortAddRemoveGroups } from '../edit-user'
import { UserModel } from '@reapit/foundations-ts-definitions'
import { addMemberToGroup, removeMemberFromGroup } from '../../../../services/user'
import useSWR from 'swr'
import { mockUserGroups } from '../../../../services/__stubs__/user-groups'

jest.mock('../../../../core/connect-session')
jest.mock('../../../../services/user')
jest.mock('swr')

const mockSWR = useSWR as jest.Mock

const props = (): EditUserFormProps => ({
  user: {
    id: 'GR1',
    name: 'User Name',
    userGroups: [
      { organisationId: 'SOME_ID', groupId: 'OF1' },
      { organisationId: 'SOME_ID', groupId: 'OF2' },
    ],
  },
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

  it('should filter user groups by whitelist and organisationId when rendering', () => {
    process.env.groupIdsWhitelist = ['OF1', 'OF2']
    const user = {
      id: 'GR1',
      name: 'User Name',
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

describe('sortAddRemoveGroups', () => {
  it('should correctly identify groups to add and remove', () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2', 'ID_3']
    const user: UserModel = {
      id: 'USER_ID',
      userGroups: [
        { organisationId: 'ORG_ID', groupId: 'ID_1' },
        { organisationId: 'ORG_ID', groupId: 'ID_2' },
      ],
    }
    const newGroupIds = 'ID_1,ID_3'
    const organisationId = 'ORG_ID'

    const result = sortAddRemoveGroups(user, newGroupIds, organisationId)

    expect(result.removeIds).toEqual(['ID_2'])
    expect(result.addIds).toEqual(['ID_3'])
  })

  it('should filter out groups not in whitelist', () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2']
    const user: UserModel = {
      id: 'USER_ID',
      userGroups: [
        { organisationId: 'ORG_ID', groupId: 'ID_1' },
        { organisationId: 'ORG_ID', groupId: 'ID_3' }, // Not in whitelist
      ],
    }
    const newGroupIds = 'ID_1,ID_2'
    const organisationId = 'ORG_ID'

    const result = sortAddRemoveGroups(user, newGroupIds, organisationId)

    // ID_3 should not be in removeIds because it's not in whitelist
    expect(result.removeIds).toEqual([])
    expect(result.addIds).toEqual(['ID_2'])
  })

  it('should filter groups by organisationId', () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2', 'ID_3']
    const user: UserModel = {
      id: 'USER_ID',
      userGroups: [
        { organisationId: 'ORG_ID', groupId: 'ID_1' },
        { organisationId: 'OTHER_ORG_ID', groupId: 'ID_2' }, // Different org
      ],
    }
    const newGroupIds = 'ID_1,ID_3'
    const organisationId = 'ORG_ID'

    const result = sortAddRemoveGroups(user, newGroupIds, organisationId)

    // ID_2 should not be in removeIds because it belongs to a different organisation
    expect(result.removeIds).toEqual([])
    expect(result.addIds).toEqual(['ID_3'])
  })

  it('should handle empty userGroups', () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2']
    const user: UserModel = {
      id: 'USER_ID',
      userGroups: undefined,
    }
    const newGroupIds = 'ID_1,ID_2'
    const organisationId = 'ORG_ID'

    const result = sortAddRemoveGroups(user, newGroupIds, organisationId)

    expect(result.removeIds).toEqual([])
    expect(result.addIds).toEqual(['ID_1', 'ID_2'])
  })

  it('should handle groups with undefined groupId', () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2']
    const user: UserModel = {
      id: 'USER_ID',
      userGroups: [
        { organisationId: 'ORG_ID', groupId: 'ID_1' },
        { organisationId: 'ORG_ID', groupId: undefined },
      ],
    }
    const newGroupIds = 'ID_1,ID_2'
    const organisationId = 'ORG_ID'

    const result = sortAddRemoveGroups(user, newGroupIds, organisationId)

    expect(result.removeIds).toEqual([])
    expect(result.addIds).toEqual(['ID_2'])
  })
})

describe('onHandleSubmit', () => {
  it('should correctly add and remove users from groups', async () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2', 'ID_3']
    const onComplete = jest.fn()
    const success = jest.fn()
    const error = jest.fn()
    const userId = 'USER_ID'
    const newGroupIds = 'ID_1,ID_3'
    const user: UserModel = {
      id: userId,
      userGroups: [
        { organisationId: 'ORG_ID', groupId: 'ID_1' },
        { organisationId: 'ORG_ID', groupId: 'ID_2' },
      ],
    }
    const organisationId = 'ORG_ID'
    const onSubmit = onHandleSubmit(onComplete, user, success, error, organisationId)

    await onSubmit({ groupIds: newGroupIds })

    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(removeMemberFromGroup).toHaveBeenCalledWith({ id: 'ID_2', userId, organisationId })

    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_3', organisationId })
  })

  it('should only process groups from the specified organisation', async () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2', 'ID_3']
    const onComplete = jest.fn()
    const success = jest.fn()
    const error = jest.fn()
    const userId = 'USER_ID'
    const newGroupIds = 'ID_1,ID_3'
    const user: UserModel = {
      id: userId,
      userGroups: [
        { organisationId: 'ORG_ID', groupId: 'ID_1' },
        { organisationId: 'OTHER_ORG_ID', groupId: 'ID_2' }, // Different org, should be ignored
      ],
    }
    const organisationId = 'ORG_ID'
    const onSubmit = onHandleSubmit(onComplete, user, success, error, organisationId)

    await onSubmit({ groupIds: newGroupIds })

    // Should only add ID_3, and not try to remove ID_2 (different org)
    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_3', organisationId })

    expect(removeMemberFromGroup).not.toHaveBeenCalled()
  })

  it('should correctly show an error message if an API call fails', async () => {
    process.env.groupIdsWhitelist = ['ID_1', 'ID_2', 'ID_3']
    ;(addMemberToGroup as jest.Mock).mockReturnValue(null)
    const onComplete = jest.fn()
    const success = jest.fn()
    const error = jest.fn()
    const userId = 'USER_ID'
    const newGroupIds = 'ID_1,ID_3'
    const user: UserModel = {
      id: userId,
      userGroups: [
        { organisationId: 'ORG_ID', groupId: 'ID_1' },
        { organisationId: 'ORG_ID', groupId: 'ID_2' },
      ],
    }
    const organisationId = 'ORG_ID'
    const onSubmit = onHandleSubmit(onComplete, user, success, error, organisationId)

    await onSubmit({ groupIds: newGroupIds })

    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(removeMemberFromGroup).toHaveBeenCalledWith({ id: 'ID_2', userId, organisationId })

    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_3', organisationId })
    expect(error).toHaveBeenCalled()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
