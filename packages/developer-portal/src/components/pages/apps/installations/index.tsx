import React, { FC, useEffect, useState } from 'react'
import { elMb11, Loader, Pagination, PersistantNotification, Table, Title } from '@reapit/elements'
import { useParams } from 'react-router-dom'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { useReapitGet } from '@reapit/utils-react'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { combineAddress, GetActionNames, getActions } from '@reapit/utils-common'
import dayjs from 'dayjs'
import { useReapitConnect } from '@reapit/connect-session'

export const AppInstallations: FC = () => {
  const { appId } = useParams<AppUriParams>()
  const { setAppId, appsDataState } = useAppState()
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const appName = appsDataState?.appDetail?.name ?? ''
  const developerId = connectSession?.loginIdentity.developerId

  const [installations, installationsLoading] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: {
      appId,
      pageNumber,
      pageSize: 12,
      isInstalled: true,
      developerId,
    },
    fetchWhenTrue: [developerId],
  })

  useEffect(handleSetAppId(appId, setAppId), [appId])

  return (
    <>
      <Title>Installations</Title>
      {installationsLoading ? (
        <Loader />
      ) : installations?.totalCount ? (
        <>
          <Table
            numberColumns={6}
            className={elMb11}
            rows={installations?.data?.map(({ customerName, client, customerAddress, created, installedBy }) => ({
              cells: [
                {
                  label: 'Customer Name',
                  value: customerName ?? '',
                  icon: 'companySystem',
                  cellHasDarkText: true,
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Reapit Customer Code',
                  value: client ?? '',
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Customer Address',
                  value: combineAddress(customerAddress),
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Date Installed',
                  value: dayjs(created).format('DD-MM-YYYY'),
                  narrowTable: {
                    showLabel: true,
                  },
                },
                {
                  label: 'Installed By',
                  value: (
                    <a
                      href={`mailto:${installedBy}?subject=Your%20recent%20installation%20of%20${appName}%20in%20the%20Reapit%20AppMarket`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {installedBy}
                    </a>
                  ),
                  narrowTable: {
                    showLabel: true,
                  },
                },
              ],
              ctaContent: {
                icon: 'trashSystem',
                onClick: console.log,
              },
            }))}
          />
          <Pagination
            callback={setPageNumber}
            currentPage={pageNumber}
            numberPages={Math.ceil((installations?.totalCount ?? 1) / 12)}
          />
        </>
      ) : installations ? (
        <PersistantNotification intent="secondary" isExpanded isFullWidth isInline>
          No installations for thie application.
        </PersistantNotification>
      ) : null}
    </>
  )
}

export default AppInstallations
