import { callGetContactByIdAPI, callGetContactsAPI, callCreateContactAPI, callUpdateContactAPI } from '../api'
import { mockContext } from '../../../__mocks__/context'
import { createContactArgsMock } from '../__mocks__/create-contact'
import { updateContactArgsMock } from '../__mocks__/update-contact'
import { getContactById, getContacts, createContact, updateContact } from '../services'
import { contactMock } from '../__mocks__/contact'
import { contactsMock } from '../__mocks__/contacts'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetContactByIdAPI: jest.fn(() => Promise.resolve(contactMock)),
  callGetContactsAPI: jest.fn(() => Promise.resolve(contactsMock)),
  callCreateContactAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateContactAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getContactById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getContactById(args, mockContext)
    expect(callGetContactByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(contactMock)
  })
})

describe('getContacts', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getContacts(args, mockContext)
    expect(callGetContactsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(contactsMock)
  })
})

describe('createContact', () => {
  it('should return correctly', async () => {
    const result = await createContact(createContactArgsMock, mockContext)
    expect(callCreateContactAPI).toHaveBeenCalledWith(createContactArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateContact', () => {
  it('should return correctly', async () => {
    const result = await updateContact(updateContactArgsMock, mockContext)
    expect(callUpdateContactAPI).toHaveBeenCalledWith(updateContactArgsMock, mockContext)
    expect(result).toEqual(true)
  })
})
