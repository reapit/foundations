import { ReapitConnectSession } from '@reapit/connect-session'

export const mockConnectSession: ReapitConnectSession = {
  accessToken: '1231231',
  idToken: '1231321',
  loginIdentity: {
    email: 'name@mail.com',
    name: 'name',
    developerId: 'SOME_DEVELOPER_ID',
    clientId: 'SOME_CLIENT_ID',
    adminId: 'SOME_ADMIN_ID',
    userCode: 'SOME_USER_ID',
    orgName: 'SOME_ORG_NAME',
    orgId: 'SOME_ORG_ID',
    groups: [
      'AgencyCloudDeveloperEdition',
      'OrganisationAdmin',
      'ReapitUser',
      'ReapitDeveloper',
      'ReapitDeveloperAdmin',
    ],
    offGroupIds: 'MKV',
    offGrouping: true,
    offGroupName: 'Cool Office Group',
    officeId: 'MVK',
    orgProduct: 'agencyCloud',
    agencyCloudId: 'SOME_AC_ID',
  },
  refreshToken: '131',
}
