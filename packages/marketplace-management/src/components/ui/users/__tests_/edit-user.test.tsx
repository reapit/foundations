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
    const organisationId = 'ORG_ID'
    const onSubmit = onHandleSubmit(onComplete, user, success, error, organisationId)

    await onSubmit({ groupIds: newGroupIds })

    expect(removeMemberFromGroup).toHaveBeenCalledTimes(1)
    expect(removeMemberFromGroup).toHaveBeenCalledWith({ id: 'ID_2', userId, organisationId })

    expect(addMemberToGroup).toHaveBeenCalledTimes(1)
    expect(addMemberToGroup).toHaveBeenCalledWith({ userId, id: 'ID_3', organisationId })
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
