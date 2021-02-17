import { fetcher } from '@reapit/elements'
import { createOfficeGroup, updateOfficeGroup } from '../office'

jest.mock('@reapit/elements')
jest.mock('../../core/connect-session')
const mockResponse = 'success'
const mockedFetch = fetcher as jest.Mock

describe('createOfficeGroup', () => {
  it('should return a response from service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    const response = await createOfficeGroup({ name: 'Group Name', officeIds: 'OF1, OF2' }, 'orgId-001')
    expect(response).toEqual(mockResponse)
  })

  it('should catch an error if no response from service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined)
    await createOfficeGroup({ name: 'Group Name', officeIds: 'OF1, OF2' }, 'orgId-001')
    expect(errorSpy).toHaveBeenLastCalledWith('Create office group failed')
  })
})

describe('updateOfficeGroup  ', () => {
  it('should return a response from the accounts service', async () => {
    mockedFetch.mockReturnValueOnce(mockResponse)
    const response = await updateOfficeGroup(
      { name: 'Group Name', officeIds: 'OF1, OF2', status: 'active' },
      'orgId-001',
      'OGID',
    )
    expect(response).toEqual(mockResponse)
  })

  it('should catch an error if no response from accounts service', async () => {
    const errorSpy = jest.spyOn(console, 'error')
    mockedFetch.mockReturnValueOnce(undefined)
    await updateOfficeGroup({ name: 'Group Name', officeIds: 'OF1, OF2', status: 'active' }, 'orgId-001', 'OGID')
    expect(errorSpy).toHaveBeenLastCalledWith('Update office group failed')
  })
})
