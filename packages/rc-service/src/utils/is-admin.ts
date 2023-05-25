import { ReapitConnectSession } from '@reapit/connect-session'

export const getIsAdmin = (connectSession: ReapitConnectSession | null): boolean => {
  const groups = connectSession?.loginIdentity.groups ?? []
  const isOrgAdmin = groups.includes('OrganisationAdmin')
  const isMarketplaceAdmin = groups.includes('MarketplaceAdmin')
  const isUserAdmin = groups.includes('ReapitUserAdmin')

  return isOrgAdmin || isUserAdmin || isMarketplaceAdmin
}
