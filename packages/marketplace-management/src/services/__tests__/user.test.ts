import { addMemberToGroup, getUserInfo, removeMemberFromGroup } from '../user'
import { fetcher } from '@reapit/utils-common'

jest.mock('@reapit/utils-common')
jest.mock('../../core/connect-session')
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock

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
    expect(errorSpy).toHaveBeenLastCalledWith('Adding member to group failed')
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
    expect(errorSpy).toHaveBeenLastCalledWith('Removing member from group failed')
  })
})

describe('getUserInfo', () => {
  const email = 'test@example.com'
  it('should return a response from the user groups service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    expect(await getUserInfo(email)).toEqual(mockResponse)
  })

  it('should catch an error if no response from user groups service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined as any)
    await getUserInfo(email)
    expect(errorSpy).toHaveBeenLastCalledWith('Fetching user info failed')
  })
})
