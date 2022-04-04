import React, { FC } from 'react'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import { Table, Subtitle, elMb7, IconNames } from '@reapit/elements'
import { useAnalyticsState } from '../state/use-analytics-state'
import dayjs from 'dayjs'
import { getMonthsRange } from './utils'

export interface DownloadResourcesTableProps {
  billing: BillingBreakdownForMonthV2Model
}

export const DownloadResourcesTable: FC<DownloadResourcesTableProps> = () => {
  const { analyticsFilterState } = useAnalyticsState()
  const { monthFrom, monthTo } = analyticsFilterState
  const monthRequests = getMonthsRange(analyticsFilterState, 'MMMM YYYY')

  return (
    <>
      <Subtitle>Download Resources</Subtitle>
      <Table
        className={elMb7}
        numberColumns={3}
        rows={[
          {
            cells: [
              {
                label: 'Type',
                value: 'Transaction History',
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
              onClick: console.log,
              icon: 'downloadSystem',
              headerContent: 'Download',
            },
          },
          ...monthRequests.map((requestMonth) => ({
            cells: [
              {
                label: 'Type',
                value: 'Cost and Usage',
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
              onClick: console.log,
              icon: 'downloadSystem' as IconNames,
              headerContent: 'Download',
            },
          })),
        ]}
      />
    </>
  )
}
