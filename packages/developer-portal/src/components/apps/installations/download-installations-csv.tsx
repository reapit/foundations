import React, { FC, useEffect, useState } from 'react'
import { AppSummaryModelPagedResult, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import FileSaver from 'file-saver'
import Papa from 'papaparse'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Button, elMb3 } from '@reapit/elements'

export const downloadInstallationAction = (
  installations: InstallationModelPagedResult,
  apps: AppSummaryModelPagedResult,
) => {
  const installationWithAppNames = installations.data?.map((installation) => {
    const appName = apps.data?.find((app) => app.id === installation.appId)?.name ?? ''

    return {
      ...installation,
      appName,
    }
  })

  const csv = Papa.unparse({
    fields: [
      'App Name',
      'Client',
      'Customer Name',
      'Created On',
      'Uninstalled On',
      'Status',
      'Installed By',
      'Uninstalled By',
    ],
    data:
      installationWithAppNames?.map(
        ({ appName, client, customerName, created, terminatesOn, status, installedBy, uninstalledBy }) => [
          appName,
          client,
          customerName,
          created,
          terminatesOn,
          status,
          installedBy,
          uninstalledBy,
        ],
      ) || [],
  })

  const blob = new Blob([csv], { type: 'data:text/csv;charset=utf-8,' })
  FileSaver.saveAs(blob, 'installs.csv')
}

export const DownloadInstallationsCSV: FC<{
  appId: string
  developerId: string
}> = ({ appId, developerId }) => {
  const [download, setDownload] = useState<boolean>(false)

  const [installations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: {
      appId,
      isInstalled: true,
      developerId,
      pageSize: 999,
    },
    fetchWhenTrue: [download],
  })

  const appIds = new Set(installations?.data?.map((installation) => installation.appId).filter(Boolean) ?? [])
  const appIdArray = [...appIds]

  // TODO is this required if I only have 1 app?
  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: {
      id: appIdArray,
      pageSize: 999,
    },
    fetchWhenTrue: [appIdArray.length],
  })

  useEffect(() => {
    if (apps && installations && apps.data && installations.data) {
      downloadInstallationAction(installations, apps)
      if (download && apps && installations) setDownload(false)
    }
  }, [apps, installations, download])

  return (
    <Button className={elMb3} intent="primary" loading={download} disabled={download} onClick={() => setDownload(true)}>
      Download CSV
    </Button>
  )
}
