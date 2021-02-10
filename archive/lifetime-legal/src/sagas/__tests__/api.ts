import { contact } from '../__stubs__/contact'
import { identityCheck } from '../__stubs__/identity-check'
import { identityTypes } from '../__stubs__/identity-types'

jest.mock('../api', () => ({
  fetchContact: jest.fn().mockResolvedValue(contact),
  fetchIdentityCheck: jest.fn().mockResolvedValue(identityCheck),
  uploadImage: jest.fn().mockResolvedValue({ Url: 'mockUrl' }),
  updateContact: jest.fn().mockResolvedValue(contact),
  updateIdentityCheck: jest.fn().mockResolvedValue(identityCheck),
  createIdentityCheck: jest.fn().mockResolvedValue(identityCheck),
  fetchIdentityDocumentTypes: jest.fn().mockResolvedValue(identityTypes),
}))

import {
  fetchContact,
  fetchIdentityCheck,
  uploadImage,
  updateContact,
  updateIdentityCheck,
  createIdentityCheck,
  fetchIdentityDocumentTypes,
} from '../api'

const mockHeaders = {
  Authorization: '123',
}

describe('checklist-detail', () => {
  describe('fetchContact', () => {
    it('should return resolve', async () => {
      const mockParams = {
        headers: mockHeaders,
        contactId: '1',
      }
      const result = await fetchContact(mockParams)
      expect(result).toEqual(contact)
    })
  })

  describe('fetchIdentityCheck', () => {
    it('should return resolve', async () => {
      const mockParams = {
        headers: mockHeaders,
        contactId: '1',
      }
      const result = await fetchIdentityCheck(mockParams)
      expect(result).toEqual(identityCheck)
    })
  })

  describe('uploadImage', () => {
    it('should return resolve', async () => {
      const mockParams = {
        name: 'test',
        imageData: 'test',
        headers: mockHeaders,
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
        headers: mockHeaders,
      }
      const result = await updateContact(mockParams)
      expect(result).toEqual(contact)
    })
  })

  describe('updateIdentityCheck', () => {
    it('should return resolve', async () => {
      const mockParams = {
        contactId: 'test',
        identityCheck,
        headers: mockHeaders,
      }
      const result = await updateIdentityCheck(mockParams)
      expect(result).toEqual(identityCheck)
    })
  })

  describe('createIdentityCheck', () => {
    it('should return resolve', async () => {
      const mockParams = {
        contactId: 'test',
        identityChecks: identityCheck,
        headers: mockHeaders,
      }
      const result = await createIdentityCheck(mockParams)
      expect(result).toEqual(identityCheck)
    })
  })

  describe('fetchIdentityDocumentTypes', () => {
    it('should return resolve', async () => {
      const mockParams = {
        headers: mockHeaders,
      }
      const result = await fetchIdentityDocumentTypes(mockParams)
      expect(result).toEqual(identityTypes)
    })
  })
})
