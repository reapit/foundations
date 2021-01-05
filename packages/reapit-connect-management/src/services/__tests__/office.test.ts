import { createOfficeGroup, updateOfficeGroup } from '../office'

jest.mock('../../core/connect-session')
const mockResponse = 'success'

const mockFetchPromise = Promise.resolve({
  json: () => mockResponse,
})

describe('createOfficeGroup', () => {
  it('should return a response from service', async () => {
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
    const response = await createOfficeGroup({ name: 'Group Name', officeIds: 'OF1, OF2' }, 'orgId-001')
    expect(response).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    window.fetch = jest.fn().mockImplementation(() => undefined as any)
    await createOfficeGroup({ name: 'Group Name', officeIds: 'OF1, OF2' }, 'orgId-001')
    expect(errorSpy).toHaveBeenLastCalledWith('Error', "Cannot read property 'then' of undefined")
  })
})

describe('updateOfficeGroup  ', () => {
  it('should return a response from the accounts service', async () => {
    window.fetch = jest.fn().mockImplementation(() => mockFetchPromise)
    const response = await updateOfficeGroup(
      { name: 'Group Name', officeIds: 'OF1, OF2', status: 'active' },
      'orgId-001',
      'OGID',
    )
    expect(response).toEqual(mockResponse)
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    window.fetch = jest.fn().mockImplementation(() => undefined as any)
    await updateOfficeGroup({ name: 'Group Name', officeIds: 'OF1, OF2', status: 'active' }, 'orgId-001', 'OGID')
    expect(errorSpy).toHaveBeenLastCalledWith('Error', "Cannot read property 'then' of undefined")
  })
})
