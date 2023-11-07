import React, { FC } from 'react'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import {
  PersistentNotification,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  elMb7,
  TableRowContainer,
} from '@reapit/elements'
import { threeColTable } from './__styles__'

export interface UsageTableProps {
  billing: BillingBreakdownForMonthV2Model
}

export const UsageTable: FC<UsageTableProps> = ({ billing }) => {
  const apiCalls = billing?.services?.find((item) => item.name === 'API Requests')?.items ?? []

  return apiCalls.length ? (
    <Table
      className={elMb7}
      rows={apiCalls.map(({ name, amount, cost, itemCount, items }) => ({
        cells: [
          {
            label: 'Entity Name',
            value: name ?? '',
            icon: 'cloud',
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Total Number Calls',
            value: String(amount),
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Total Number Endpoints',
            value: String(itemCount),
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
          {
            label: 'Total Cost',
            value: cost ? `£${cost.toFixed(2).padStart(2, '0')}` : '£0',
            icon: 'pound',
            cellHasDarkText: true,
            narrowTable: {
              showLabel: true,
            },
          },
        ],
        expandableContent: {
          content: (
            <>
              <Table>
                <TableHeadersRow className={threeColTable}>
                  <TableHeader>Endpoint Name</TableHeader>
                  <TableHeader>Endpoint Number Calls</TableHeader>
                  <TableHeader>Endpoint Cost</TableHeader>
                </TableHeadersRow>
                {items?.map(({ name, amount, cost }) => (
                  <TableRowContainer key={name}>
                    <TableRow className={threeColTable}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{amount}</TableCell>
                      <TableCell>{cost ? `£${cost.toFixed(2).padStart(2, '0')}` : '£0'}</TableCell>
                    </TableRow>
                  </TableRowContainer>
                ))}
              </Table>
            </>
          ),
        },
      }))}
    />
  ) : (
    <div>
      <PersistentNotification isExpanded isFullWidth isInline intent="primary">
        No results found for your selected filters
      </PersistentNotification>
    </div>
  )
}
