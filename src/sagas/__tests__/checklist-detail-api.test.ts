jest.mock('../checklist-detail', () => ({
  fetchContact: jest.fn().mockResolvedValue(contact),
  fetchIdentityCheck: jest.fn().mockResolvedValue(idCheck),
  uploadImage: jest.fn().mockResolvedValue({ Url: 'mockUrl' }),
  updateContact: jest.fn().mockResolvedValue(contact),
  updateIdentityCheck: jest.fn().mockResolvedValue(idCheck),
  createIdentityCheck: jest.fn().mockResolvedValue(idCheck)
}))

import { contact, idCheck } from '../__stubs__/contact'
import {
  fetchContact,
  fetchIdentityCheck,
  uploadImage,
  updateContact,
  updateIdentityCheck,
  createIdentityCheck
} from '../checklist-detail'

const mockHeaders = {
  Authorization: '123'
}

describe('checklist-detail', () => {
  describe('fetchContact', () => {
    it('should return resolve', async () => {
      const mockParams = {
        headers: mockHeaders,
        contactId: '1'
      }
      const result = await fetchContact(mockParams)
      expect(result).toEqual(contact)
    })
  })

  describe('fetchIdentityCheck', () => {
    it('should return resolve', async () => {
      const mockParams = {
        headers: mockHeaders,
        contactId: '1'
      }
      const result = await fetchIdentityCheck(mockParams)
      expect(result).toEqual(idCheck)
    })
  })

  describe('uploadImage', () => {
    it('should return resolve', async () => {
      const mockParams = {
        name: 'test',
        imageData: 'test',
        headers: mockHeaders
      }
      const result = await uploadImage(mockParams)
      expect(result).toEqual({ Url: 'mockUrl' })
    })
  })

  describe('updateContact', () => {
    it('should return resolve', async () => {
      const mockParams = {
        contactId: 'test',
        contact,
        headers: mockHeaders
      }
      const result = await updateContact(mockParams)
      expect(result).toEqual(contact)
    })
  })

  describe('updateIdentityCheck', () => {
    it('should return resolve', async () => {
      const mockParams = {
        contactId: 'test',
        identityChecks: idCheck,
        headers: mockHeaders
      }
      const result = await updateIdentityCheck(mockParams)
      expect(result).toEqual(idCheck)
    })
  })

  describe('createIdentityCheck', () => {
    it('should return resolve', async () => {
      const mockParams = {
        contactId: 'test',
        identityChecks: idCheck,
        headers: mockHeaders
      }
      const result = await createIdentityCheck(mockParams)
      expect(result).toEqual(idCheck)
    })
  })
})
