import React from 'react'
import { render } from '@testing-library/react'
import EditUserGroupForm, {
  EditUserGroupFormProps,
  handleSetOptions,
  onHandleSubmit,
  EditUserGroupSchema,
  prepareGroupOptions,
} from '../edit-user-group'
import { addMemberToGroup, removeMemberFromGroup } from '../../../../services/user'
import { mockUserGroups } from '../../../../services/__stubs__/user-groups'
import { GroupModel, UserModel } from '@reapit/foundations-ts-definitions'
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
    mockSWR
      .mockReturnValue({
        data: mockUsersList,
        error: null,
        mutate: jest.fn(),
      })
      .mockReturnValue({
        data: mockUserGroups,
        error: null,
        mutate: jest.fn(),
      })

    expect(render(<EditUserGroupForm {...props()} />)).toMatchSnapshot()
  })
})

describe('handleSetOptions', () => {
  it('should set options', () => {
    const userIds = ['aG9sbHlqb3lwaGlsbGlwcytkZXNrdG9wdXNlckBnbWFpbC5jb20']
    const users = mockUsersList._embedded as UserModel[]
    const search = 'holly'
    const setOptions = jest.fn()
    const getValues = jest.fn(() => ({
      userIds: userIds.join(','),
    })) as unknown as UseFormGetValues<EditUserGroupSchema>

    const curried = handleSetOptions(userIds, users, search, setOptions, getValues)

    curried()

    expect(setOptions).toHaveBeenCalledWith(
      prepareGroupOptions([(mockUsersList._embedded as UserModel[])[0], (mockUsersList._embedded as UserModel[])[1]]),
    )
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
  const organisationId = 'SOME_ID'
  const onSubmit = onHandleSubmit(
    onComplete,
    refetchMembers,
    success,
    error,
    originalUserIds,
    userGroupId,
    organisationId,
  )

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
