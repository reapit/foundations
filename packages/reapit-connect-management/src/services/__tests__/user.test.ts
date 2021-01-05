import { updateUser } from '../user'

jest.mock('../../core/connect-session')
const mockResponse = 'success'

const mockFetchPromise = Promise.resolve({
  json: () => mockResponse,
})

describe('updateUser  ', () => {
  it('should return a response from service', async () => {
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
    const response = await updateUser({ name: 'Group Name', groupIds: ['OF1', 'OF2'] }, 'orgId-001')
    expect(response).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    window.fetch = jest.fn().mockImplementation(() => undefined as any)
    await updateUser({ name: 'Group Name', groupIds: ['OF1', 'OF2'] }, 'orgId-001')
    expect(errorSpy).toHaveBeenLastCalledWith('Error', "Cannot read property 'then' of undefined")
  })
})
