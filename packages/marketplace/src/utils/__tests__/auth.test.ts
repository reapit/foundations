import { ReapitConnectSession } from '@reapit/connect-session'
import { selectLoginIdentity, selectIsAdmin, selectIsOffGrouping } from '../auth'

export const mockSession: ReapitConnectSession = {
  accessToken: '1231231',
  idToken: '1231321',
  loginIdentity: {
    adminId: '1',
    clientId: '1',
    developerId: '1',
    email: '123',
    groups: [
      'AgencyCloudDeveloperEdition',
      'OrganisationAdmin',
      'ReapitUser',
      'ReapitDeveloper',
      'ReapitDeveloperAdmin',
    ],
    userCode: '123',
    name: '1312',
    orgName: 'Reapit Ltd',
    orgId: 'SOME_ORG_ID',
    offGroupIds: 'MKV',
    offGrouping: true,
    offGroupName: 'Cool Office Group',
    officeId: 'MVK',
    orgProduct: 'agencyCloud',
    agencyCloudId: 'SOME_AC_ID',
  },
  refreshToken: '131',
}

describe('selectLoginIdentity', () => {
  it('should return a login identity', () => {
    expect(selectLoginIdentity(mockSession)).toEqual(mockSession.loginIdentity)
  })
})

describe('selectIsAdmin', () => {
  it('should return correctly if ReapitUserAdmin and off grouping false', () => {
    expect(
      selectIsAdmin({
        ...mockSession,
        loginIdentity: { ...mockSession.loginIdentity, groups: ['ReapitUserAdmin'], offGrouping: false },
      }),
    ).toBeTruthy()
  })

  it('should return correctly if ReapitUserAdmin and off grouping true', () => {
    expect(
      selectIsAdmin({
        ...mockSession,
        loginIdentity: { ...mockSession.loginIdentity, groups: ['ReapitUserAdmin'], offGrouping: true },
      }),
    ).toBeFalsy()
  })

  it('should return correctly if MarketplaceAdmin and off grouping false', () => {
    expect(
      selectIsAdmin({
        ...mockSession,
        loginIdentity: { ...mockSession.loginIdentity, groups: ['MarketplaceAdmin'], offGrouping: false },
      }),
    ).toBeTruthy()
  })

  it('should return correctly if MarketplaceAdmin and off grouping true', () => {
    expect(
      selectIsAdmin({
        ...mockSession,
        loginIdentity: { ...mockSession.loginIdentity, groups: ['MarketplaceAdmin'], offGrouping: false },
      }),
    ).toBeTruthy()
  })

  it('should return correctly if an org admin and has offGrouping', () => {
    expect(
      selectIsAdmin({
        ...mockSession,
        loginIdentity: { ...mockSession.loginIdentity, groups: ['OrganisationAdmin'], offGrouping: true },
      }),
    ).toBeTruthy()
  })

  it('should return correctly if an org admin and has no offGrouping', () => {
    expect(
      selectIsAdmin({
        ...mockSession,
        loginIdentity: { ...mockSession.loginIdentity, groups: ['OrganisationAdmin'], offGrouping: false },
      }),
    ).toBeFalsy()
  })

  it('should return correctly if no admin permissions', () => {
    expect(selectIsAdmin({ ...mockSession, loginIdentity: { ...mockSession.loginIdentity, groups: [] } })).toBeFalsy()
  })
})

describe('selectIsOffGrouping', () => {
  it('should return correctly with office grouping', () => {
    expect(
      selectIsOffGrouping({ ...mockSession, loginIdentity: { ...mockSession.loginIdentity, offGrouping: true } }),
    ).toBeTruthy()
  })

  it('should return correctly without office grouping', () => {
    expect(
      selectIsOffGrouping({ ...mockSession, loginIdentity: { ...mockSession.loginIdentity, offGrouping: false } }),
    ).toBeFalsy()
  })
})
