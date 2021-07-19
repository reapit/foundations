import contactServices from '../services'
import { checkPermission } from '../../../utils/check-permission'
import errors from '../../../errors'
import { queryGetContactById, queryGetContacts, mutationCreateContact, mutationUpdateContact } from '../resolvers'
import { mockCreateContactArgs } from '../__stubs__/mock-create-contact'
import { mockUpdateContactArgs } from '../__stubs__/mock-update-contact'
import { mockContact } from '../__stubs__/mock-contact'
import { mockContacts } from '../__stubs__/mock-contacts'
import { mockContext } from '../../../__stubs__/mock-context'

jest.mock('../services', () => ({
  getContactById: jest.fn(() => mockContact),
  getContacts: jest.fn(() => mockContacts),
  createContact: jest.fn(() => true),
  updateContact: jest.fn(() => true),
}))
jest.mock('../../../errors', () => ({
  generateAuthenticationError: jest.fn(() => 'authentication error'),
}))
jest.mock('../../../logger')
jest.mock('../../../utils/check-permission', () => ({
  checkPermission: jest.fn(() => true),
}))

describe('queryGetContactById', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: 'id' }
    const result = queryGetContactById(null, args, mockContext)
    expect(result).toEqual(contactServices.getContactById(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: 'id' }
    const result = queryGetContactById(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('queryGetContacts', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetContacts(null, args, mockContext)
    expect(result).toEqual(contactServices.getContacts(args, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = queryGetContacts(null, args, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationCreateContact', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationCreateContact(null, mockCreateContactArgs, mockContext)
    expect(result).toEqual(contactServices.createContact(mockCreateContactArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationCreateContact(null, mockCreateContactArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})

describe('mutationUpdateContact', () => {
  it('should return correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(true)
    const result = mutationUpdateContact(null, mockUpdateContactArgs, mockContext)
    expect(result).toEqual(contactServices.updateContact(mockUpdateContactArgs, mockContext))
  })

  it('should return auth error correctly', () => {
    ;(checkPermission as jest.Mock).mockReturnValue(false)
    const result = mutationUpdateContact(null, mockUpdateContactArgs, mockContext)
    expect(result).toEqual(errors.generateAuthenticationError(mockContext.traceId))
  })
})
