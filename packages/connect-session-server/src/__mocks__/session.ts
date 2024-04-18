import { ReapitConnectServerSessionInitializers, CoginitoSession } from '../'
import base64 from 'base-64'

export const createMockToken = (token: { [s: string]: any } | string): string =>
  `${base64.encode('{}')}.${base64.encode(typeof token === 'string' ? token : JSON.stringify(token))}.${base64.encode(
    '{}',
  )}`

export const mockLoginIdentity = {
  email: 'name@mail.com',
  name: 'name',
  developerId: 'SOME_DEVELOPER_ID',
  clientId: 'SOME_CLIENT_ID',
  adminId: 'SOME_ADMIN_ID',
  userCode: 'SOME_USER_ID',
  orgName: 'SOME_ORG_NAME',
  orgId: 'SOME_ORG_ID',
  groups: ['AgencyCloudDeveloperEdition', 'OrganisationAdmin', 'ReapitUser', 'ReapitDeveloper', 'ReapitDeveloperAdmin'],
  offGroupIds: 'MKV',
  offGrouping: true,
  offGroupName: 'Cool Office Group',
  officeId: 'MVK',
  orgProduct: 'agencyCloud',
  agencyCloudId: 'SOME_AC_ID',
}

export const mockServerInitializers: ReapitConnectServerSessionInitializers = {
  connectClientId: 'SOME_CLIENT_ID',
  connectOAuthUrl: 'SOME_URL',
  connectClientSecret: 'SOME_SECRET',
}

export const mockTokenResponse: CoginitoSession = {
  access_token: createMockToken({
    exp: Math.round(new Date().getTime() / 1000) + 360, // time now + 6mins - we refresh session if expiry within 5mins
  }),
  refresh_token: 'SOME_REFRESH_TOKEN',
  id_token: createMockToken({
    name: mockLoginIdentity.name,
    email: mockLoginIdentity.email,
    'custom:reapit:developerId': mockLoginIdentity.developerId,
    'custom:reapit:clientCode': mockLoginIdentity.clientId,
    'custom:reapit:marketAdmin': mockLoginIdentity.adminId,
    'custom:reapit:userCode': mockLoginIdentity.userCode,
    'cognito:groups': mockLoginIdentity.groups,
  }),
}
