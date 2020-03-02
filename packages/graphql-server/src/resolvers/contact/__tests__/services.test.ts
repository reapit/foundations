import { GetContactByIdArgs, GetContactsArgs } from '../types'
import { getContactById, getContacts, createContact, updateContact } from '../services'
import { mockContext } from '../../../__mocks__/context'
import { contact } from '../__mocks__/contact'
import { contacts } from '../__mocks__/contacts'
import { mockCreateArgs } from '../__mocks__/create-args'
import { mockUpdateArgs } from '../__mocks__/update-args'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetContactByIdAPI: jest.fn(() => contact),
  callGetContactsAPI: jest.fn(() => contacts),
  callCreateContactAPI: jest.fn(() => contact),
  callUpdateContactAPI: jest.fn(() => contact),
}))

describe('contact services', () => {
  describe('getContactById', () => {
    it('should run correctly', () => {
      const mockArgs = {
        id: '123',
      } as GetContactByIdArgs
      const result = getContactById(mockArgs, mockContext)
      const output = contact
      expect(result).toEqual(output)
    })
  })

  describe('getContacts', () => {
    it('should run correctly', () => {
      const mockArgs = {
        name: '123',
      } as GetContactsArgs
      const result = getContacts(mockArgs, mockContext)
      const output = contacts
      expect(result).toEqual(output)
    })
  })

  describe('createContact', () => {
    it('should run correctly', () => {
      const result = createContact(mockCreateArgs, mockContext)
      const output = contact
      expect(result).toEqual(output)
    })
  })

  describe('updateContact', () => {
    it('should run correctly', () => {
      const result = updateContact(mockUpdateArgs, mockContext)
      const output = contact
      expect(result).toEqual(output)
    })
  })
})
