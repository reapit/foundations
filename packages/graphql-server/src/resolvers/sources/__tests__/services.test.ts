import { callGetSourceByIdAPI, callGetSourcesAPI, callCreateSourceAPI, callUpdateSourceAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateSourceArgs } from '../__stubs__/mock-create-source'
import { mockUpdateSourceArgs } from '../__stubs__/mock-update-source'
import { getSourceById, getSources, createSource, updateSource } from '../services'
import { mockSource } from '../__stubs__/mock-source'
import { mockSources } from '../__stubs__/mock-sources'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetSourceByIdAPI: jest.fn(() => Promise.resolve(mockSource)),
  callGetSourcesAPI: jest.fn(() => Promise.resolve(mockSources)),
  callCreateSourceAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateSourceAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getSourceById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getSourceById(args, mockContext)
    expect(callGetSourceByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockSource)
  })
})

describe('getSources', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getSources(args, mockContext)
    expect(callGetSourcesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockSources)
  })
})

describe('createSource', () => {
  it('should return correctly', async () => {
    const result = await createSource(mockCreateSourceArgs, mockContext)
    expect(callCreateSourceAPI).toHaveBeenCalledWith(mockCreateSourceArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateSource', () => {
  it('should return correctly', async () => {
    const result = await updateSource(mockUpdateSourceArgs, mockContext)
    expect(callUpdateSourceAPI).toHaveBeenCalledWith(mockUpdateSourceArgs, mockContext)
    expect(result).toEqual(true)
  })
})
