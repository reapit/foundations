import React, { FC } from 'react'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import { Table, elMb7, IconNames, PersistentNotification } from '@reapit/elements'
import { AnalyticsFilterState, useAnalyticsState } from '../state/use-analytics-state'
import dayjs from 'dayjs'
import { flattenBillingData, getMonthsRange } from './utils'
import fileSaver from 'file-saver'
import { unparse } from 'papaparse'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { useReapitConnect } from '@reapit/connect-session'
import { billingTransactionDownloadService } from '../../../services/billing'
import { useSnack } from '@reapit/elements'
import { logger } from '@reapit/utils-react'

export interface DownloadResourcesTableProps {
  billing: BillingBreakdownForMonthV2Model
}

export const handleDownloadTransactions =
  (
    analyticsFilterState: AnalyticsFilterState,
    displayMonth: string,
    error: (message: string) => void,
    developerId?: string | null,
  ) =>
  async () => {
    const downloads = await billingTransactionDownloadService(analyticsFilterState, displayMonth, developerId)
    if (!downloads) {
      error('Something went wrong downloading your transactions, the error has been logged')
    }
  }

export const handleDownloadCSV = (billing: BillingBreakdownForMonthV2Model, error: (message: string) => void) => () => {
  const flattenedData = flattenBillingData(billing.services ?? [])
  try {
    const csvData = unparse(flattenedData)
    const dataBlob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' })
    fileSaver.saveAs(dataBlob, 'billing.csv')
  } catch (err) {
    logger(err as Error)
    error('Something went wrong downloading your billing information, the error has been logged')
  }
}

export const DownloadResourcesTable: FC<DownloadResourcesTableProps> = ({ billing }) => {
  const { analyticsFilterState } = useAnalyticsState()
  const { error } = useSnack()
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const developerId = connectSession?.loginIdentity.developerId
  const { monthFrom, monthTo, appId } = analyticsFilterState
  const monthRequests = getMonthsRange(analyticsFilterState, 'MMMM YYYY')

  return (
    <>
      <Table
        className={elMb7}
        numberColumns={3}
        rows={[
          {
            cells: [
              {
                label: 'Type',
                value: 'Cost and Usage',
                icon: 'cloudSolidSystem',
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Period',
                value: `${dayjs(monthFrom).format('MMMM YYYY')}${
                  monthFrom !== monthTo ? `- ${dayjs(monthTo).format('MMMM YYYY')}` : ''
                }`,
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            ctaContent: {
              onClick: handleDownloadCSV(billing, error),
              icon: 'downloadSolidSystem',
              headerContent: 'Download',
            },
          },
          ...monthRequests.map((requestMonth) => ({
            cells: [
              {
                label: 'Type',
                value: 'Transaction History',
                icon: 'cloudSolidSystem' as IconNames,
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
              {
                label: 'Period',
                value: requestMonth,
                cellHasDarkText: true,
                narrowTable: {
                  showLabel: true,
                },
              },
            ],
            ctaContent: {
              onClick: appId
                ? handleDownloadTransactions(analyticsFilterState, requestMonth, error, developerId)
                : undefined,
              icon: (appId ? 'downloadSolidSystem' : 'closeSolidSystem') as IconNames,
              headerContent: 'Download',
            },
          })),
        ]}
      />
      {!appId && (
        <PersistentNotification isInline isFullWidth isExpanded intent="secondary">
          Please select an app from the filters to download transaction history
        </PersistentNotification>
      )}
    </>
  )
}
