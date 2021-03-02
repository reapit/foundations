import { callGetOfficeByIdAPI, callGetOfficesAPI, callCreateOfficeAPI, callUpdateOfficeAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { createOfficeArgsMock } from '../__stubs__/mock-create-office'
import { updateOfficeArgsMock } from '../__stubs__/mock-update-office'
import { getOfficeById, getOffices, createOffice, updateOffice } from '../services'
import { officeMock } from '../__stubs__/mock-office'
import { officesMock } from '../__stubs__/mock-offices'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetOfficeByIdAPI: jest.fn(() => Promise.resolve(officeMock)),
  callGetOfficesAPI: jest.fn(() => Promise.resolve(officesMock)),
  callCreateOfficeAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateOfficeAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getOfficeById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getOfficeById(args, mockContext)
    expect(callGetOfficeByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(officeMock)
  })
})

describe('getOffices', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getOffices(args, mockContext)
    expect(callGetOfficesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(officesMock)
  })
})

describe('createOffice', () => {
  it('should return correctly', async () => {
    const result = await createOffice(createOfficeArgsMock, mockContext)
    expect(callCreateOfficeAPI).toHaveBeenCalledWith(createOfficeArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateOffice', () => {
  it('should return correctly', async () => {
    const result = await updateOffice(updateOfficeArgsMock, mockContext)
    expect(callUpdateOfficeAPI).toHaveBeenCalledWith(updateOfficeArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
