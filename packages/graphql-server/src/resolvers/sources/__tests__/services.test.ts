import { callGetSourceByIdAPI, callGetSourcesAPI, callCreateSourceAPI, callUpdateSourceAPI } from '../api'
import { mockContext } from '../../../__stubs__/context'
import { createSourceArgsMock } from '../__stubs__/create-source'
import { updateSourceArgsMock } from '../__stubs__/update-source'
import { getSourceById, getSources, createSource, updateSource } from '../services'
import { sourceMock } from '../__stubs__/source'
import { sourcesMock } from '../__stubs__/sources'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetSourceByIdAPI: jest.fn(() => Promise.resolve(sourceMock)),
  callGetSourcesAPI: jest.fn(() => Promise.resolve(sourcesMock)),
  callCreateSourceAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateSourceAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getSourceById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getSourceById(args, mockContext)
    expect(callGetSourceByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(sourceMock)
  })
})

describe('getSources', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getSources(args, mockContext)
    expect(callGetSourcesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(sourcesMock)
  })
})

describe('createSource', () => {
  it('should return correctly', async () => {
    const result = await createSource(createSourceArgsMock, mockContext)
    expect(callCreateSourceAPI).toHaveBeenCalledWith(createSourceArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateSource', () => {
  it('should return correctly', async () => {
    const result = await updateSource(updateSourceArgsMock, mockContext)
    expect(callUpdateSourceAPI).toHaveBeenCalledWith(updateSourceArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
