import { addMemberToGroup, removeMemberFromGroup, updateUser } from '../user'
import { fetcher } from '@reapit/elements'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock

describe('updateUser', () => {
  const mockGroup = { name: 'Group Name', groupIds: ['OF1', 'OF2'] }
  const mockOrgId = 'orgId-001'
  it('should return a response from the users service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await updateUser(mockGroup, mockOrgId)).toEqual(mockResponse)
  })

  it('should catch an error if no response from users service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await updateUser(mockGroup, mockOrgId)
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Failed to update user')
  })
})

describe('addMemberToGroup', () => {
  const mocUserGroup = { id: 'SOME_ID', userId: 'SOME_USER_ID' }
  it('should return a response from the user groups service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await addMemberToGroup(mocUserGroup)).toEqual(mockResponse)
  })

  it('should catch an error if no response from user groups service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await addMemberToGroup(mocUserGroup)
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Adding member to group failed')
  })
})

describe('removeMemberFromGroup', () => {
  const mocUserGroup = { id: 'SOME_ID', userId: 'SOME_USER_ID' }
  it('should return a response from the user groups service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await removeMemberFromGroup(mocUserGroup)).toEqual(mockResponse)
  })

  it('should catch an error if no response from user groups service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await removeMemberFromGroup(mocUserGroup)
    expect(errorSpy).toHaveBeenLastCalledWith('Error', 'Removing member from group failed')
  })
})
