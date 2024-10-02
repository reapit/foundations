import React, { FC, useEffect, useState } from 'react'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import { GetActionNames, getActions } from '@reapit/use-reapit-data'
import { useReapitGet } from '@reapit/use-reapit-data'
import FileSaver from 'file-saver'
import Papa from 'papaparse'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { Button, ButtonGroup } from '@reapit/elements'
import { useAppState } from '../state/use-app-state'
import { useReapitConnect } from '@reapit/connect-session'

export const downloadInstallationAction = (installations: Marketplace.InstallationModelPagedResult) => {
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
      installations.data?.map(
        ({ client, appName, customerName, created, terminatesOn, status, installedBy, uninstalledBy }) => [
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

export const DownloadInstallationsCSV: FC = () => {
  const [download, setDownload] = useState<boolean>(false)
  const { appsDataState } = useAppState()
  const appId = appsDataState.appDetail?.id
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [installations] = useReapitGet<Marketplace.InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getInstallations],
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
      downloadInstallationAction(installations)
      if (download && installations) setDownload(false)
    }
  }, [installations, download])

  return (
    <ButtonGroup>
      <Button
        intent="primary"
        loading={download}
        disabled={download || !connectSession}
        onClick={() => setDownload(true)}
      >
        Download CSV
      </Button>
    </ButtonGroup>
  )
}
