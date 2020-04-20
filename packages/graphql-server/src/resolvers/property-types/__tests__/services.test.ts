import { callGetPropertyTypesByIdAPI } from '../api'
import { mockContext } from '../../../__mocks__/context'
import { propertyTypesMock } from '../__mocks__/propertyTypes'
import { getPropertyTypes } from '../services'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetPropertyTypesByIdAPI: jest.fn(() => Promise.resolve(propertyTypesMock)),
}))

describe('getPropertyTypes', () => {
  it('should return correctly', async () => {
    const result = await getPropertyTypes(null, mockContext)
    expect(callGetPropertyTypesByIdAPI).toHaveBeenCalledWith(null, mockContext)
    expect(result).toEqual(propertyTypesMock)
  })
})
