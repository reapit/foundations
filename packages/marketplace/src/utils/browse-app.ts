import { ReapitConnectSession } from '@reapit/connect-session'
import { AppDetailModel, AppSummaryModelPagedResult } from '@reapit/foundations-ts-definitions'
import { COGNITO_GROUP_ORGANISATION_ADMIN } from './auth'

export const filterRestrictedAppsList =
  (apps: AppSummaryModelPagedResult | null, connectSession: ReapitConnectSession | null) =>
  (): AppSummaryModelPagedResult | null => {
    const isOrgAdmin = connectSession?.loginIdentity.groups.includes(COGNITO_GROUP_ORGANISATION_ADMIN)
    const clientId = connectSession?.loginIdentity.clientId

    if (!apps || !apps?.data || !clientId) return null

    const clientHiddenAppIds = window.reapit.config.clientHiddenAppIds[clientId] ?? []

    const filtered = apps.data.filter(({ id }) => {
      if (!id) return false
      const isClientRestricted = clientHiddenAppIds.includes(id)
      const isOrgRestricted = !isOrgAdmin && window.reapit.config.orgAdminRestrictedAppIds.includes(id)

      return !isClientRestricted && !isOrgRestricted
    })

    return {
      ...apps,
      data: filtered,
    }
  }

export const filterRestrictedAppDetail =
  (app: AppDetailModel | null, connectSession: ReapitConnectSession | null) => (): AppDetailModel | null => {
    const isOrgAdmin = connectSession?.loginIdentity.groups.includes(COGNITO_GROUP_ORGANISATION_ADMIN)
    const clientId = connectSession?.loginIdentity.clientId
    const id = app?.id

    if (!id || !clientId) return null

    const clientHiddenAppIds = window.reapit.config.clientHiddenAppIds[clientId] ?? []
    const isClientRestricted = clientHiddenAppIds.includes(id)
    const isOrgRestricted = !isOrgAdmin && window.reapit.config.orgAdminRestrictedAppIds.includes(id)

    if (!isClientRestricted && !isOrgRestricted) return app

    return null
  }
