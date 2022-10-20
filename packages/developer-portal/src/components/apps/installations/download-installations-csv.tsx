import React, { FC, useEffect, useState } from 'react'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/utils-common'
import { useReapitGet } from '@reapit/utils-react'
import FileSaver from 'file-saver'
import Papa from 'papaparse'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Button, elMb3 } from '@reapit/elements'
import { useAppState } from '../state/use-app-state'
import { useReapitConnect } from '@reapit/connect-session'

export const downloadInstallationAction = (installations: InstallationModelPagedResult, appName: string) => {
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
      installations.data?.map(({ client, customerName, created, terminatesOn, status, installedBy, uninstalledBy }) => [
        appName,
        client,
        customerName,
        created,
        terminatesOn,
        status,
        installedBy,
        uninstalledBy,
      ]) || [],
  })

  const blob = new Blob([csv], { type: 'data:text/csv;charset=utf-8,' })
  FileSaver.saveAs(blob, 'installs.csv')
}

export const DownloadInstallationsCSV: FC = () => {
  const [download, setDownload] = useState<boolean>(false)
  const { appsDataState } = useAppState()
  const appId = appsDataState.appDetail?.id
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [installations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: {
      appId,
      isInstalled: true,
      developerId: connectSession?.loginIdentity.developerId,
      pageSize: 999,
    },
    fetchWhenTrue: [download, connectSession],
  })

  useEffect(() => {
    if (installations && installations.data) {
      downloadInstallationAction(installations, appsDataState.appDetail?.name as string)
      if (download && installations) setDownload(false)
    }
  }, [installations, download])

  return (
    <Button
      className={elMb3}
      intent="primary"
      loading={download}
      disabled={download || !connectSession}
      onClick={() => setDownload(true)}
    >
      Download CSV
    </Button>
  )
}
