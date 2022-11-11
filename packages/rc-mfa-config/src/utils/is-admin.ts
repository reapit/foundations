import { ReapitConnectSession } from '@reapit/connect-session'

export const getIsAdmin = (connectSession: ReapitConnectSession | null): boolean => {
  const groups = connectSession?.loginIdentity.groups ?? []
  const isOrgAdmin = groups.includes('OrganisationAdmin')
  const isReapitEmployee = groups.includes('ReapitEmployee')
  const isReapitEmployeeAdmin = groups.includes('ReapitEmployeeFoundationsAdmin')

  return isOrgAdmin || isReapitEmployee || isReapitEmployeeAdmin
}
