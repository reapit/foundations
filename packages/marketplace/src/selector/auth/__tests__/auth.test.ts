import {
  selectLoginIdentity,
  selectIsAdmin,
  selectClientId,
  selectDeveloperId,
  selectLoggedUserEmail,
  selectDeveloperEditionId,
} from '../auth'
import { auth } from '../__mocks__/auth'

describe('auth', () => {
  describe('selectLoginIdentity', () => {
    it('run correctly', () => {
      expect(selectLoginIdentity(auth)).toEqual(auth.loginIdentity)
    })
    it('selectLoginIdentity', () => {
      expect(selectIsAdmin(auth)).toBeTruthy()
      expect(selectIsAdmin({ ...auth, loginIdentity: { ...auth.loginIdentity, adminId: '' } })).toBeFalsy()
    })
  })
  describe('selectIsAdmin', () => {
    it('should return correctly', () => {
      expect(selectIsAdmin(auth)).toEqual(!!auth.loginIdentity.adminId)
    })
  })
  describe('selectClientId', () => {
    it('should run correctly', () => {
      expect(selectClientId(auth)).toEqual(auth.loginIdentity.clientId)
    })
  })
  describe('selectDeveloperId', () => {
    it('should run correctly', () => {
      expect(selectDeveloperId(auth)).toEqual(auth.loginIdentity.developerId)
    })
  })
  describe('selectLoggedUserEmail', () => {
    it('should run correctly', () => {
      expect(selectLoggedUserEmail(auth)).toEqual(auth.loginIdentity.email)
    })
  })
  describe('selectDeveloperEditionId', () => {
    it('should run correctly', () => {
      expect(selectDeveloperEditionId(auth)).toEqual(auth.loginIdentity.developerId)
    })
  })
})
