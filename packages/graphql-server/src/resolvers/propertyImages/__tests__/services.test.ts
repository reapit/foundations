import {
  callGetPropertyImageByIdAPI,
  callGetPropertyImagesAPI,
  callCreatePropertyImageAPI,
  callUpdatePropertyImageAPI,
  callDeletePropertyImageAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreatePropertyImageArgs } from '../__stubs__/mock-create-property-image'
import { mockUpdatePropertyImageArgs } from '../__stubs__/mock-update-property-image'
import {
  getPropertyImageById,
  getPropertyImages,
  createPropertyImage,
  updatePropertyImage,
  deletePropertyImage,
} from '../services'
import { mockPropertyImage } from '../__stubs__/mock-property-image'
import { mockPropertyImages } from '../__stubs__/mock-property-images'
import { mockDeletePropertyImageArgs } from '../__stubs__/mock-delete-property-image'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetPropertyImageByIdAPI: jest.fn(() => Promise.resolve(mockPropertyImage)),
  callGetPropertyImagesAPI: jest.fn(() => Promise.resolve(mockPropertyImages)),
  callCreatePropertyImageAPI: jest.fn(() => Promise.resolve(true)),
  callUpdatePropertyImageAPI: jest.fn(() => Promise.resolve(true)),
  callDeletePropertyImageAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getPropertyImageById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getPropertyImageById(args, mockContext)
    expect(callGetPropertyImageByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockPropertyImage)
  })
})

describe('getPropertyImages', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getPropertyImages(args, mockContext)
    expect(callGetPropertyImagesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockPropertyImages)
  })
})

describe('createPropertyImage', () => {
  it('should return correctly', async () => {
    const result = await createPropertyImage(mockCreatePropertyImageArgs, mockContext)
    expect(callCreatePropertyImageAPI).toHaveBeenCalledWith(mockCreatePropertyImageArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updatePropertyImage', () => {
  it('should return correctly', async () => {
    const result = await updatePropertyImage(mockUpdatePropertyImageArgs, mockContext)
    expect(callUpdatePropertyImageAPI).toHaveBeenCalledWith(mockUpdatePropertyImageArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('deletePropertyImage', () => {
  it('should return correctly', async () => {
    const result = await deletePropertyImage(mockDeletePropertyImageArgs, mockContext)
    expect(callDeletePropertyImageAPI).toHaveBeenCalledWith(mockDeletePropertyImageArgs, mockContext)
    expect(result).toEqual(true)
  })
})
