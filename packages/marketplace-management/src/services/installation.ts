import { fetcher } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../core/connect-session'
import { URLS } from '../constants/api'
import { getPlatformHeaders, logger } from '@reapit/utils-react'
import { CreateInstallationModel, TerminateInstallationModel } from '@reapit/foundations-ts-definitions'
import { MetaDataType } from '../components/ui/apps/app-installation-confirmation-modal'

export const bulkInstall = async (
  installFor: (string | undefined)[],
  uninstallFor: (string | undefined)[],
  appId?: string,
  metadata?: { metadata?: MetaDataType },
): Promise<boolean | void> => {
  if (!appId) throw new Error('App Id not provided')

  const session = await reapitConnectBrowserSession.connectSession()
  if (!session) throw new Error('No Reapit Connect Session is present')

  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.INSTALLATIONS}/bulk`,
        body: {
          appId,
          actionedBy: session.loginIdentity.email,
          installFor,
          uninstallFor,
          ...metadata,
        },
        method: 'POST',
        headers,
      })

      if (response) return true
      throw new Error('Failed to create bulk installations')
    }
  } catch (err) {
    logger(err as Error)
  }
}

export const installOrg = async (body: CreateInstallationModel): Promise<boolean | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: URLS.INSTALLATIONS,
        body,
        method: 'POST',
        headers,
      })

      if (response) return true
      throw new Error('Failed to create installation')
    }
  } catch (err) {
    logger(err as Error)
  }
}

export const uninstallOrg = async (
  body: TerminateInstallationModel,
  installationId: string,
): Promise<boolean | void> => {
  try {
    const headers = await getPlatformHeaders(reapitConnectBrowserSession, 'latest')
    if (headers) {
      const response = await fetcher({
        api: window.reapit.config.platformApiUrl,
        url: `${URLS.INSTALLATIONS}/${installationId}/terminate`,
        body,
        method: 'POST',
        headers,
      })

      if (response) return true
      throw new Error('Failed to terminate installation')
    }
  } catch (err) {
    logger(err as Error)
  }
}
