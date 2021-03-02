import {
  callGetPropertyImageByIdAPI,
  callGetPropertyImagesAPI,
  callCreatePropertyImageAPI,
  callUpdatePropertyImageAPI,
  callDeletePropertyImageAPI,
} from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { createPropertyImageArgsMock } from '../__stubs__/mock-create-property-image'
import { updatePropertyImageArgsMock } from '../__stubs__/mock-update-property-image'
import {
  getPropertyImageById,
  getPropertyImages,
  createPropertyImage,
  updatePropertyImage,
  deletePropertyImage,
} from '../services'
import { propertyImageMock } from '../__stubs__/mock-property-image'
import { propertyImagesMock } from '../__stubs__/mock-property-images'
import { deletePropertyImageArgsMock } from '../__stubs__/mock-delete-property-image'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetPropertyImageByIdAPI: jest.fn(() => Promise.resolve(propertyImageMock)),
  callGetPropertyImagesAPI: jest.fn(() => Promise.resolve(propertyImagesMock)),
  callCreatePropertyImageAPI: jest.fn(() => Promise.resolve(true)),
  callUpdatePropertyImageAPI: jest.fn(() => Promise.resolve(true)),
  callDeletePropertyImageAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getPropertyImageById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getPropertyImageById(args, mockContext)
    expect(callGetPropertyImageByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(propertyImageMock)
  })
})

describe('getPropertyImages', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getPropertyImages(args, mockContext)
    expect(callGetPropertyImagesAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(propertyImagesMock)
  })
})

describe('createPropertyImage', () => {
  it('should return correctly', async () => {
    const result = await createPropertyImage(createPropertyImageArgsMock, mockContext)
    expect(callCreatePropertyImageAPI).toHaveBeenCalledWith(createPropertyImageArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updatePropertyImage', () => {
  it('should return correctly', async () => {
    const result = await updatePropertyImage(updatePropertyImageArgsMock, mockContext)
    expect(callUpdatePropertyImageAPI).toHaveBeenCalledWith(updatePropertyImageArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('deletePropertyImage', () => {
  it('should return correctly', async () => {
    const result = await deletePropertyImage(deletePropertyImageArgsMock, mockContext)
    expect(callDeletePropertyImageAPI).toHaveBeenCalledWith(deletePropertyImageArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
