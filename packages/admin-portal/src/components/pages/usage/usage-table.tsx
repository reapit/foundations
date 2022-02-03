import React, { FC } from 'react'
import { BillingBreakdownForMonthV2Model } from '@reapit/foundations-ts-definitions'
import {
  PersistantNotification,
  Table,
  TableCell,
  TableHeader,
  TableHeadersRow,
  TableRow,
  Subtitle,
  BodyText,
} from '@reapit/elements'
import { threeColTable } from './__styles__'

export interface UsageTableProps {
  billing: BillingBreakdownForMonthV2Model | null
}

export const UsageTable: FC<UsageTableProps> = ({ billing }) => {
  const apiCalls = billing?.services?.find((item) => item.name === 'API Requests')?.items ?? []
  return apiCalls.length ? (
    <>
      <Subtitle>Monthly Total</Subtitle>
      <BodyText hasGreyText>£{billing?.totalCost}</BodyText>
      <Subtitle>Breakdown</Subtitle>
      <Table
        rows={apiCalls.map(({ name, amount, cost, itemCount, items }) => ({
          cells: [
            {
              label: 'Entity Name',
              value: name ?? '',
              icon: 'homeSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Total Number Calls',
              value: String(amount) ?? '',
              icon: 'homeSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Total Cost',
              value: cost ? `£${cost}` : '£0',
              icon: 'homeSystem',
              cellHasDarkText: true,
              narrowTable: {
                showLabel: true,
              },
            },
            {
              label: 'Total Number Endpoints',
              value: String(itemCount) ?? '',
              icon: 'homeSystem',
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
                    <TableRow className={threeColTable} key={name}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{amount}</TableCell>
                      <TableCell>{cost ? `£${cost}` : '£0'}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </>
            ),
          },
        }))}
      />
    </>
  ) : (
    <div>
      <PersistantNotification isExpanded isFullWidth isInline intent="secondary">
        No results found for your selected filters
      </PersistantNotification>
    </div>
  )
}
