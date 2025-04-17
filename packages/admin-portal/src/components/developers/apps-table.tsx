import React, { FC, useState } from 'react'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import {
  PersistentNotification,
  Table,
  Subtitle,
  BodyText,
  elMb11,
  Loader,
  Pagination,
  Icon,
  elMt5,
} from '@reapit/elements'
import { toLocalTime } from '@reapit/utils-common'
import { useReapitGet, GetActionNames, getActions } from '@reapit/use-reapit-data'
import { reapitConnectBrowserSession } from '../../core/connect-session'

export interface AppsTableProps {
  devIdApps: string
}

export const AppsTable: FC<AppsTableProps> = ({ devIdApps }) => {
  const [pageNumber, setPageNumber] = useState<number>(1)

  const [apps, appsLoading] = useReapitGet<Marketplace.AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getApps],
    queryParams: {
      pageNumber,
      pageSize: 12,
      developerId: devIdApps,
    },
    fetchWhenTrue: [devIdApps],
  })

  return appsLoading ? (
    <Loader />
  ) : apps?.data?.length ? (
    <div className={elMt5}>
      <Subtitle>Total Apps</Subtitle>
      <BodyText hasGreyText>{apps.totalCount}</BodyText>
      <Table
        className={elMb11}
        rows={apps.data.map(({ name, id, summary, isListed, isDirectApi, isFeatured, created, publicListedDate }) => ({
          cells: [
            {
              label: 'App Name',
              value: name ?? '',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'AppId',
              value: id ?? '',
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Summary',
              value: summary ?? '',
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Listed',
              value: <Icon icon={isListed ? 'check' : 'close'} />,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Integration',
              value: <Icon icon={isDirectApi ? 'check' : 'close'} />,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Featured',
              value: <Icon icon={isFeatured ? 'check' : 'close'} />,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Created',
              value: toLocalTime(created) ?? '',
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Publicly Listed',
              value: publicListedDate ? toLocalTime(publicListedDate) : '-',
              narrowTable: {
                showLabel: true,
              },
            },
          ],
          expandableContent: {
            content: (
              <PersistentNotification isExpanded isFullWidth isInline intent="primary">
                Visit the dedicated apps page to perform actions on this app
              </PersistentNotification>
            ),
          },
        }))}
      />
      <Pagination
        callback={setPageNumber}
        currentPage={pageNumber}
        numberPages={Math.ceil((apps?.totalCount ?? 1) / 12)}
      />
    </div>
  ) : (
    <div className={elMt5}>
      <PersistentNotification isExpanded isFullWidth isInline intent="primary">
        No results found for your selected filters
      </PersistentNotification>
    </div>
  )
}
