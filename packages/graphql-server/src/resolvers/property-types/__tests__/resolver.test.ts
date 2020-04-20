import propertyTypesServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryPropertyTypes } from '../resolver'
import { propertyTypesMock } from '../__mocks__/propertyTypes'
import { mockContext } from '../../../__mocks__/context'

jest.mock('../services', () => ({
  getPropertyTypes: jest.fn(() => propertyTypesMock),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryPropertyTypes', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = {}
    const result = queryPropertyTypes(null, args, mockContext)
    expect(result).toEqual(propertyTypesServices.getPropertyTypes(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = {}
    const result = queryPropertyTypes(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
