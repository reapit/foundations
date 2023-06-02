import { ReapitConnectSession } from '@reapit/connect-session'

export const getIsAdmin = (connectSession: ReapitConnectSession | null) => {
  const groups = connectSession?.loginIdentity.groups ?? []
  const isEmployee = groups.includes('ReapitEmployee')
  const isFoundationsAdmin = groups.includes('ReapitEmployeeFoundationsAdmin')
  const isSupport = groups.includes('ReapitEmployeeSupport')

  return {
    isEmployee,
    isFoundationsAdmin,
    isSupport,
    isAdmin: isEmployee || isFoundationsAdmin || isSupport,
  }
}
