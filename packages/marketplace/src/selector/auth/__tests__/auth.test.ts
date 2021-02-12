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
  selectIsOffGrouping,
  selectOffGroupName,
} from '../auth'
import { auth } from '../__mocks__/auth'

describe('auth', () => {
  describe('selectLoginIdentity', () => {
    it('run correctly', () => {
      expect(selectLoginIdentity(auth)).toEqual(auth.loginIdentity)
    })
  })
  describe('selectIsAdmin', () => {
    it('should return correctly if ReapitUserAdmin and off grouping false', () => {
      expect(
        selectIsAdmin({
          ...auth,
          loginIdentity: { ...auth.loginIdentity, groups: ['ReapitUserAdmin'], offGrouping: false },
        }),
      ).toBeTruthy()
    })

    it('should return correctly if ReapitUserAdmin and off grouping true', () => {
      expect(
        selectIsAdmin({
          ...auth,
          loginIdentity: { ...auth.loginIdentity, groups: ['ReapitUserAdmin'], offGrouping: true },
        }),
      ).toBeFalsy()
    })

    it('should return correctly if MarketplaceAdmin and off grouping false', () => {
      expect(
        selectIsAdmin({
          ...auth,
          loginIdentity: { ...auth.loginIdentity, groups: ['MarketplaceAdmin'], offGrouping: false },
        }),
      ).toBeTruthy()
    })

    it('should return correctly if MarketplaceAdmin and off grouping true', () => {
      expect(
        selectIsAdmin({
          ...auth,
          loginIdentity: { ...auth.loginIdentity, groups: ['MarketplaceAdmin'], offGrouping: false },
        }),
      ).toBeTruthy()
    })

    it('should return correctly if an org admin and has offGrouping', () => {
      expect(
        selectIsAdmin({
          ...auth,
          loginIdentity: { ...auth.loginIdentity, groups: ['OrganisationAdmin'], offGrouping: true },
        }),
      ).toBeTruthy()
    })

    it('should return correctly if an org admin and has no offGrouping', () => {
      expect(
        selectIsAdmin({
          ...auth,
          loginIdentity: { ...auth.loginIdentity, groups: ['OrganisationAdmin'], offGrouping: false },
        }),
      ).toBeFalsy()
    })

    it('should return correctly if no admin permissions', () => {
      expect(selectIsAdmin({ ...auth, loginIdentity: { ...auth.loginIdentity, groups: [] } })).toBeFalsy()
    })
  })

  describe('selectIsOffGrouping', () => {
    it('should return correctly', () => {
      expect(selectIsOffGrouping({ ...auth, loginIdentity: { ...auth.loginIdentity, offGrouping: true } })).toBeTruthy()
    })

    it('should return correctly', () => {
      expect(selectIsOffGrouping({ ...auth, loginIdentity: { ...auth.loginIdentity, offGrouping: false } })).toBeFalsy()
    })
  })

  describe('selectOffGroupName', () => {
    it('should return correctly', () => {
      expect(selectOffGroupName({ ...auth, loginIdentity: { ...auth.loginIdentity } })).toEqual('Cool Office Group')
    })

    it('should return correctly', () => {
      expect(selectIsOffGrouping({ ...auth, loginIdentity: { ...auth.loginIdentity, offGrouping: false } })).toBeFalsy()
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
