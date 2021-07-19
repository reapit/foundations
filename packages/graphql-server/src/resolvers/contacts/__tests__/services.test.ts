import { callGetContactByIdAPI, callGetContactsAPI, callCreateContactAPI, callUpdateContactAPI } from '../api'
import { mockContext } from '../../../__stubs__/mock-context'
import { mockCreateContactArgs } from '../__stubs__/mock-create-contact'
import { mockUpdateContactArgs } from '../__stubs__/mock-update-contact'
import { getContactById, getContacts, createContact, updateContact } from '../services'
import { mockContact } from '../__stubs__/mock-contact'
import { mockContacts } from '../__stubs__/mock-contacts'

jest.mock('../../../logger')
jest.mock('../api', () => ({
  callGetContactByIdAPI: jest.fn(() => Promise.resolve(mockContact)),
  callGetContactsAPI: jest.fn(() => Promise.resolve(mockContacts)),
  callCreateContactAPI: jest.fn(() => Promise.resolve(true)),
  callUpdateContactAPI: jest.fn(() => Promise.resolve(true)),
}))

describe('getContactById', () => {
  it('should return correctly', async () => {
    const args = { id: 'id' }
    const result = await getContactById(args, mockContext)
    expect(callGetContactByIdAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockContact)
  })
})

describe('getContacts', () => {
  it('should return correctly', async () => {
    const args = { id: ['id1', 'id2'], pageSize: 10, pageNumber: 1 }
    const result = await getContacts(args, mockContext)
    expect(callGetContactsAPI).toHaveBeenCalledWith(args, mockContext)
    expect(result).toEqual(mockContacts)
  })
})

describe('createContact', () => {
  it('should return correctly', async () => {
    const result = await createContact(mockCreateContactArgs, mockContext)
    expect(callCreateContactAPI).toHaveBeenCalledWith(mockCreateContactArgs, mockContext)
    expect(result).toEqual(true)
  })
})

describe('updateContact', () => {
  it('should return correctly', async () => {
    const result = await updateContact(mockUpdateContactArgs, mockContext)
    expect(callUpdateContactAPI).toHaveBeenCalledWith(mockUpdateContactArgs, mockContext)
    expect(result).toEqual(true)
  })
})
