import React from 'react'
import { render } from '@testing-library/react'
import EditUserGroupForm, {
  EditUserGroupFormProps,
  handleSetNewOptions,
  handleSetOptions,
  onHandleSubmit,
  prepareGroupOptions,
  UpdateUserGroupModel,
} from '../edit-user-group'
import { addMemberToGroup, removeMemberFromGroup } from '../../../../services/user'
import { mockUserGroups } from '../../../../services/__stubs__/user-groups'
import { GroupModel, UserModel } from '../../../../types/organisations-schema'
import useSWR from 'swr'
import { mockUsersList } from '../../../../services/__stubs__/users'
import { UseFormGetValues } from 'react-hook-form'

jest.mock('../../../../core/connect-session')
jest.mock('../../../../services/user')
jest.mock('swr')

const mockSWR = useSWR as jest.Mock

const props = (): EditUserGroupFormProps => ({
  userGroup: (mockUserGroups?._embedded as GroupModel[])[0],
  onComplete: jest.fn,
  orgId: 'SOME_ID',
})

describe('EditUserGroupForm', () => {
  it('should match a snapshot where there is data', () => {
    mockSWR.mockReturnValue({
      data: mockUserGroups,
      error: null,
      mutate: jest.fn(),
    })
    expect(render(<EditUserGroupForm {...props()} />)).toMatchSnapshot()
  })
})

describe('handleSetOptions', () => {
  it('should set options', () => {
    const userIds = ['id1', 'id2', 'id3']
    const users = mockUsersList._embedded as UserModel[]
    const setOptions = jest.fn()
    const reset = jest.fn()

    const curried = handleSetOptions(userIds, users, setOptions, reset)

    curried()

    expect(reset).toHaveBeenCalledWith({
      userIds: userIds.join(','),
    })

    expect(setOptions).toHaveBeenCalledWith([])
  })
})

describe('handleSetNewOptions', () => {
  it('should set options', () => {
    const getValues = jest.fn(() => ({ userIds: 'id1' })) as unknown as UseFormGetValues<UpdateUserGroupModel>
    const options = []
    const searchedUsers = mockUsersList._embedded as UserModel[]
    const setOptions = jest.fn()

    const curried = handleSetNewOptions(getValues, options, searchedUsers, setOptions)

    curried()

    expect(setOptions).toHaveBeenCalledWith(prepareGroupOptions(searchedUsers))
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
