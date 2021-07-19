import { callGetOfficeByIdAPI, callGetOfficesAPI, callCreateOfficeAPI, callUpdateOfficeAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateOfficeArgs } from '../__stubs__/mock-create-office'
import { mockUpdateOfficeArgs } from '../__stubs__/mock-update-office'
import { getOfficeById, getOffices, createOffice, updateOffice } from '../services'
import { mockOffice } from '../__stubs__/mock-office'
import { mockOffices } from '../__stubs__/mock-offices'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetOfficeByIdAPI: jest.fn(() => Promise.resolve(mockOffice)),
  callGetOfficesAPI: jest.fn(() => Promise.resolve(mockOffices)),
  callCreateOfficeAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateOfficeAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getOfficeById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getOfficeById(args, mockContext)
    expect(callGetOfficeByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockOffice)
  })
})

describe('getOffices', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getOffices(args, mockContext)
    expect(callGetOfficesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockOffices)
  })
})

describe('createOffice', () => {
  it('should return correctly', async () => {
    const result = await createOffice(mockCreateOfficeArgs, mockContext)
    expect(callCreateOfficeAPI).toHaveBeenCalledWith(mockCreateOfficeArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateOffice', () => {
  it('should return correctly', async () => {
    const result = await updateOffice(mockUpdateOfficeArgs, mockContext)
    expect(callUpdateOfficeAPI).toHaveBeenCalledWith(mockUpdateOfficeArgs, mockContext)
    expect(result).toEqual(true)
  })
})
