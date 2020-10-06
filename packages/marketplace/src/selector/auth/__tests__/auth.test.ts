import {
  selectLoginIdentity,
  selectIsAdmin,
  selectClientId,
  selectDeveloperId,
  selectLoggedUserEmail,
  selectDeveloperEditionId,
  selectLoggedUserName,
  selectLoggedUserCompanyName,
  selectIsUser,
} from '../auth'
import { auth } from '../__mocks__/auth'

describe('auth', () => {
  describe('selectLoginIdentity', () => {
    it('run correctly', () => {
      expect(selectLoginIdentity(auth)).toEqual(auth.loginIdentity)
    })
  })
  describe('selectIsAdmin', () => {
    it('should return correctly', () => {
      expect(
        selectIsAdmin({ ...auth, loginIdentity: { ...auth.loginIdentity, groups: ['ReapitUserAdmin'] } }),
      ).toBeTruthy()
    })

    it('should return correctly', () => {
      expect(selectIsAdmin({ ...auth, loginIdentity: { ...auth.loginIdentity, groups: [] } })).toBeFalsy()
    })
  })

  describe('selectIsUser', () => {
    it('should return correctly', () => {
      expect(selectIsUser({ ...auth, loginIdentity: { ...auth.loginIdentity, groups: ['ReapitUser'] } })).toBeTruthy()
    })

    it('should return correctly', () => {
      expect(selectIsUser({ ...auth, loginIdentity: { ...auth.loginIdentity, groups: [] } })).toBeFalsy()
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
  describe('selectLoggedUserName', () => {
    it('should run correctly', () => {
      expect(selectLoggedUserName(auth)).toEqual(auth.loginIdentity.name)
    })
  })
  describe('selectLoggedUserCompanyName', () => {
    it('should run correctly', () => {
      expect(selectLoggedUserCompanyName(auth)).toEqual(auth.loginIdentity.orgName)
    })
  })
})
