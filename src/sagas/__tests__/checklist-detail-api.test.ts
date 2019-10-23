jest.mock('../checklist-detail', () => ({
  fetchChecklist: jest.fn().mockResolvedValue(contact),
  fetchIdentityCheck: jest.fn().mockResolvedValue(idCheck),
  uploadImage: jest.fn().mockResolvedValue({ Url: 'mockUrl' }),
  updateChecklist: jest.fn().mockResolvedValue(contact),
  updateIdentityCheck: jest.fn().mockResolvedValue(idCheck),
  createIdentityCheck: jest.fn().mockResolvedValue(idCheck)
}))

import { contact, idCheck } from '../__stubs__/contact'
import {
  fetchChecklist,
  fetchIdentityCheck,
  uploadImage,
  updateChecklist,
  updateIdentityCheck,
  createIdentityCheck
} from '../checklist-detail'

const mockHeaders = {
  Authorization: '123'
}

describe('checklist-detail', () => {
  describe('fetchChecklist', () => {
    it('should return resolve', async () => {
      const mockParams = {
        headers: mockHeaders,
        id: '1'
      }
      const result = await fetchChecklist(mockParams)
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
      const result = await updateChecklist(mockParams)
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
